import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { formatPrice } from "@/utils/currency.util"

export default function StatsSale({ data }: { data: { all_sale: number, total: number, total_returns: number } }) {
    return (
        <div className="flex gap-3">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-normal">Jumlah Penjualan</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{data.all_sale || 0} <span className="text-xs text-muted-foreground">
                        Penjualan
                    </span></div>
                </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-normal">Total Uang Masuk</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatPrice(data.total || 0)} <span className="text-xs text-muted-foreground">
                        
                    </span></div>
                </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-normal">Total Pendapatan</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatPrice(data.total_returns || 0)} <span className="text-xs text-muted-foreground">
                        
                    </span></div>
                </CardContent>
            </Card>
        </div>
    )

}