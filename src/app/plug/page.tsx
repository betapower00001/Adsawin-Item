// app/plug/page.tsx
import { redirect } from 'next/navigation';

export default function PlugRootRedirectPage() {
    // กำหนดชนิดปลั๊กไฟเริ่มต้นที่คุณต้องการให้เป็นหน้าแรก
    const defaultPlugId = 'universal'; 
    
    // ทำการเปลี่ยนเส้นทางไปยังหน้า Customizer ของปลั๊กเริ่มต้นทันที
    redirect(`/plug/${defaultPlugId}`);
}