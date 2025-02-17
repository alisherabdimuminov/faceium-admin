<script setup lang="ts">
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { IReports, IResponse } from '~/types';


definePageMeta({
    title: "Hisobotlar",
    middleware: ["is-auth", "get-branches", "get-departments"],
});



const { decode, jsonify } = useSecrets();

const branchesStore = useBranchesStore();
const departmentsStore = useDepartmentStore();

const { branches } = storeToRefs(branchesStore);
const { departments } = storeToRefs(departmentsStore);

const date = ref(new Date());
const branch = ref("");
const pdfContent = ref();
const department = ref("");
const reports = ref<IReports[]>([]);


const filteredByBranch = computed(() => {
    return reports.value.filter(report => 
        report.branch ? (branch.value === 'all' ? report : report.branch.name.includes(branch.value)) : false
    )
});

const filterByDepartment = computed(() => {
    return filteredByBranch.value.filter(report => 
        report.department ? (department.value === 'all' ? report : report.department.name.includes(department.value)) : false
    )
});

const getReports = async (date: Date) => {
    let response = await $fetch<IResponse>(api("reports"), {
        query: {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
        }
    });

    if (response.status === "error") {

    } else {
        let decoded = <IReports[]> jsonify(decode(response.data));
        if (decoded) {
            reports.value = decoded;
        }
    }

}

const updateDate = (value: any) => {
    console.log(value);
    date.value = value;
}

const generatePDF = async () => {
    if (!pdfContent.value) return;

    const canvas = await html2canvas(pdfContent.value, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`Hisobot - ${new Date().toLocaleDateString("uz-UZ", { day: "2-digit", month: "long", "year": "numeric" })}.pdf`);
};


watch(date, () => {
    getReports(date.value);
});

onMounted(() => {
    getReports(new Date());
    let r = document.getElementById("reports");
    console.log(r?.innerHTML);
});
</script>

<template>
    <div class="grid gap-5 p-5">
        <div class="flex flex-col md:flex-row gap-2">
            <Select v-model="branch">
                <SelectTrigger>
                    <SelectValue placeholder="Filialni tanlang" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Barcha filiallar</SelectItem>
                    <SelectItem v-for="ibranch in branches" :key="ibranch.id" :value="ibranch.name">{{ ibranch.name }}</SelectItem>
                </SelectContent>
            </Select>
            <Select v-model="department">
                <SelectTrigger>
                    <SelectValue placeholder="Bo'limni tanlang" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Barcha bo'limlar</SelectItem>
                    <SelectItem v-for="idepartment in departments" :key="idepartment.id" :value="idepartment.name">{{ idepartment.name }}</SelectItem>
                </SelectContent>
            </Select>
            <Popover>
                <PopoverTrigger as-child>
                    <Button>{{ date.toLocaleDateString("uz-Uz") }}</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar @update:model-value="updateDate"  />
                </PopoverContent>
            </Popover>
            <Button @click="generatePDF">PDF</Button>
        </div>
        <div ref="pdfContent" class="border rounded-md overflow-auto">
            <Table>
                <TableHeader>
                    <TableRow class="bg-accent/30 hover:bg-accent/30">
                        <TableHead class="text-center" colspan="3">Xodim</TableHead>
                        <TableHead class="text-center border-l" colspan="3">Kirish</TableHead>
                        <TableHead class="text-center border-l" colspan="3">Chiqish</TableHead>
                    </TableRow>
                    <TableRow>
                        <TableHead class="w-8">ID</TableHead>
                        <TableHead>Ism familiyasi</TableHead>
                        <TableHead>Bo'limi</TableHead>
                        <TableHead class="border-l text-center">Holati</TableHead>
                        <TableHead class="text-center">Vaqti</TableHead>
                        <TableHead class="border-r text-center">Bino</TableHead>
                        <TableHead class="text-center">Holati</TableHead>
                        <TableHead class="text-center">Vaqti</TableHead>
                        <TableHead class="text-center">Bino</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="report, index in filterByDepartment">
                        <TableCell>{{ index+1 }}</TableCell>
                        <TableCell>{{ report.first_name }} {{ report.last_name }}</TableCell>
                        <TableCell>{{ report.department ? report.department.name : "Kiritilmagan" }}</TableCell>
                        <TableCell class="border-l text-center">
                            <span v-if="report.input_status === 'arrived'" class="text-green-500  rounded-md">Kelgan</span>
                            <span v-else-if="report.input_status === 'crash'" class="text-red-500  rounded-md">Qoida buzilgan</span>
                            <span v-else-if="report.input_status === 'didnotcome'" class="text-red-500  rounded-md">Kelmagan</span>
                            <span v-else-if="report.input_status === 'failed'" class="text-red-500  rounded-md">Xatolik</span>
                            <span v-else-if="report.input_status === 'late'" class="text-orange-500  rounded-md">Kech qolgan</span>
                        </TableCell>
                        <TableCell class="border-l text-center">
                            <span v-if="report.input_status === 'arrived'" class="text-green-500 text-sm font-bold rounded-md">{{ report.input_time }}</span>
                            <span v-else-if="report.input_status === 'crash'" class="text-red-500 text-sm font-bold rounded-md">{{ report.input_time }}</span>
                            <span v-else-if="report.input_status === 'didnotcome'" class="text-red-500 text-sm font-bold rounded-md">{{ report.input_time }}</span>
                            <span v-else-if="report.input_status === 'failed'" class="text-red-500 text-sm font-bold rounded-md">{{ report.input_time }}</span>
                            <span v-else-if="report.input_status === 'late'" class="text-orange-500 text-sm font-bold rounded-md">{{ report.input_time }}</span>
                        </TableCell>
                        <TableCell class="border-l text-center">
                            {{ report.input_area }}
                        </TableCell>
                        <TableCell class="border-l text-center">
                            <span v-if="report.output_status === 'crash'" class="text-red-500  rounded-md">Qoida buzilgan</span>
                            <span v-else-if="report.output_status === 'failed'" class="text-red-500  rounded-md">Xatolik</span>
                            <span v-else-if="report.output_status === 'gone'" class="text-green-500  rounded-md">Ketgan</span>
                        </TableCell>
                        <TableCell class="border-l text-center">
                            <span v-if="report.output_status === 'crash'" class="text-red-500 text-sm font-bold rounded-md">{{ report.output_time }}</span>
                            <span v-else-if="report.output_status === 'failed'" class="text-red-500 text-sm font-bold rounded-md">{{ report.output_time }}</span>
                            <span v-else-if="report.output_status === 'gone'" class="text-green-500 text-sm font-bold rounded-md">{{ report.output_time }}</span>
                        </TableCell>
                        <TableCell class="border-l text-center">
                            {{ report.output_area }}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>
