import Image from "next/image";
import { Background, Widget } from "@/components/ui";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Background>

        {/* 중앙 텍스트 */}
        <div 
          style={{ 
           position: 'absolute',
           top: '50%',
           left: '50%',
           transform: 'translate(-50%, -50%)',
           width: '100%',
           height: '100%',
           zIndex: 100,
          }}
          className="flex items-center justify-center"
        >
          <div className="text-center">
            <h1 className="text-[128px] leading-[128px] font-bold opacity-50 text-white mb-2 font-mono">Good Morning</h1>
            <h2 className="text-[128px] leading-[128px] font-bold opacity-75 text-white font-mono">David</h2>
          </div>
        </div>

        {/* 좌측 상단 1x1 위젯 (418x418px) */}
        <Widget 
          style={{ 
            position: 'absolute',
            left: '60px',
            top: '60px',
            width: '418px', 
            height: '418px',
            borderRadius: '9999px'
          }} 
        />
        
        {/* 좌측 하단 1x2 위젯 (418x877px) */}
        <Widget 
          style={{ 
            position: 'absolute',
            left: '60px',
            top: '524px', // 60px + 418px + 42px + 4px
            width: '418px', 
            height: '877px', // 1200px - 60px*2 - 418px - 42px - 8px = 608px (실제 가능한 높이로 조정)
            borderRadius: '9999px'
          }} 
        />
        
        {/* 우측 상단 1x2 위젯 (418x877px) */}
        <Widget 
          style={{ 
            position: 'absolute',
            right: '60px',
            top: '60px',
            width: '418px', 
            height: '877px', // 좌측 하단과 동일한 높이로 맞춤
            borderRadius: '9999px'
          }} 
        />
        
        {/* 우측 하단 1x1 위젯 (418x418px) */}
        <Widget 
          style={{ 
            position: 'absolute',
            right: '60px',
            bottom: '60px',
            width: '418px', 
            height: '418px',
            borderRadius: '9999px'
          }} 
        />
      </Background>
    </div>
  );
}
