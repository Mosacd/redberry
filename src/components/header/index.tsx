import logo from '@/assets/Frame 1000006027.svg'
import add from '@/assets/add.svg'

const Header = () => {

    return(
        <div className='flex w-full justify-between px-[120px] py-[30px]'>
        <img src={logo} alt="" />
        <div className='flex gap-[40px]'>
          <button className='py-[10px] px-[20px] border-[#8338EC] border-[1px] rounded-[5px]
           transition duration-200
            text-[#212529] cursor-pointer hover:border-[#B588F4]'>თანამშრომლის შექმნა</button>
          <button className='py-[10px] px-[20px] bg-[#8338EC] rounded-[5px]
           transition duration-200
             cursor-pointer hover:bg-[#B588F4]'><div className='flex gap-[4px]
             items-center text-[#FFFFFF]'><img src={add} alt="" className='w-[20px] h-[20px]' /> შექმენი ახალი დავალება</div></button>
        </div>
       </div>
    )
}

export default Header;