
import logo from '@/assets/Frame 1000006027.svg'
import add from '@/assets/add.svg'
import CustomSelect from './customElements/select'
function App() {

  return (
    <>
  
     <div className='flex w-full justify-between px-[120px] py-[30px]'>
      <img src={logo} alt="" />
      <div className='flex gap-[40px]'>
        <button className='py-[10px] px-[20px] border-[#8338EC] border-[1px] rounded-[5px]
         leading-[100%] tracking-[0] text-[16px] font-[400] 
         font-[FiraGO] text-[#212529] cursor-pointer hover:border-[#B588F4]'>თანამშრომლის შექმნა</button>
        <button className='py-[10px] px-[20px] bg-[#8338EC] rounded-[5px]
         leading-[100%] tracking-[0] text-[16px] font-[400]  font-[FiraGO]
          text-[#FFFFFF] cursor-pointer hover:bg-[#B588F4]'><div className='flex gap-[4px]
           items-center'><img src={add} alt="" className='w-[20px] h-[20px]' /> შექმენი ახალი დავალება</div></button>
      </div>
     </div>
    
    <div className='px-[118px]'>
    <h1 className='font-[FiraGO] leading-[100%] font-[600] text-[34px] mt-[40px] mb-[52px] tracking-[0] text-[#212529]'>დავალებების გვერდი</h1>
    <div className='flex max-w-fit gap-[45px] border-[1px] border-[#DEE2E6] rounded-[10px] relative'>
    <CustomSelect />

       </div>

    </div>
    </>
  )
}

export default App