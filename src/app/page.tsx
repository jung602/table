import Image from "next/image";
import { Background, Widget } from "@/components/ui";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Background style={{ width: '1920px', height: '1200px' }}>
        <Widget style={{ width: '100%', height: '100%' }} />
        <Widget style={{ width: '100%', height: '100%' }} />
        <Widget style={{ width: '100%', height: '100%' }} />
        <Widget style={{ width: '100%', height: '100%' }} />
        <Widget style={{ width: '100%', height: '200%' }} />
        <Widget style={{ width: '100%', height: '200%' }} />
        <Widget style={{ width: '200%', height: '100%' }} />
      </Background>
    </div>
  );
}
