
import logo from '@/assets/Frame 1000006027.svg'
import add from '@/assets/add.svg'
import CustomSelect from './customElements/select'
import { useGetStatuses } from './reactQuery/query/statuses';
import prof from '@/assets/Ellipse 3892.png'
function App() {

    const{data:statuses = [], isLoading} = useGetStatuses();
  
   
      const colors = ['#F7BC30', '#FB5607', '#FF006E', '#3A86FF'];

    // if(isLoading){
    //   return(<h1>Loading...</h1>)
    // }

  return (
    <>
  
     <div className='flex w-full justify-between px-[120px] py-[30px]'>
      <img src={logo} alt="" />
      <div className='flex gap-[40px]'>
        <button className='py-[10px] px-[20px] border-[#8338EC] border-[1px] rounded-[5px]
         
         font-[FiraGO] text-[#212529] cursor-pointer hover:border-[#B588F4]'>თანამშრომლის შექმნა</button>
        <button className='py-[10px] px-[20px] bg-[#8338EC] rounded-[5px]
         leading-[100%]
          text-[#FFFFFF] cursor-pointer hover:bg-[#B588F4]'><div className='flex gap-[4px]
           items-center'><img src={add} alt="" className='w-[20px] h-[20px]' /> შექმენი ახალი დავალება</div></button>
      </div>
     </div>
    
    <div className='px-[118px]'>
    <h1 className='font-[FiraGO] leading-[100%] font-[600] text-[34px] mt-[40px] mb-[52px] tracking-[0] text-[#212529]'>დავალებების გვერდი</h1>
    <div className='flex max-w-fit gap-[45px] border-[1px] border-[#DEE2E6] rounded-[10px] relative'>
    <CustomSelect />

       </div>

    <div className='w-full flex justify-center gap-[52px] mt-[79px]'>
    {statuses?.map((status, index) => {
        return(   <div className='flex flex-col gap-[30px]'>
        <div className={`flex justify-center items-center py-[15px] h-[54px] w-[381px] rounded-[10px]`}
          style={{ backgroundColor: colors[index] }}
        >
          <h2 className='text-[20px] font-[500] text-[#FFFFFF]'>{status.name}</h2>
      </div>
      
       <div className='flex flex-col w-[381px] h-[217px] p-[20px] gap-[28px] rounded-[15px] hover:cursor-pointer border-[1px] hover:border-[2px] transition-all duration-200 border-[#CED4DA]'>
            <div className='flex justify-between w-full'>
              <div className='flex gap-[10px]'>
                <div className='border-[#FA4D4D] border-[0.5px] rounded-[5px] p-[4px] text-[12px] laeding-[150%] font-[500] text-[#FA4D4D]'>მაღალი</div>
                <div className='bg-[#FF66A8] text-[#FFFFFF] py-[5px] px-[9px] rounded-[15px] text-[12px]'>დიზაინი</div>
                </div>
                <p className='text-[12px]'>22 იანვ, 2022</p>
                </div>
                <div className='flex flex-col gap-[12px]'>
            <h2 className='font-[600] text-[15px] text-[#212529]'>
              Redberry-ს სტილის ლენდინგის დიზაინი
            </h2>
            <p className='text-[14px] text-[#343A40]'>შექმენი საიტის მთავარი გვერდი, რომელიც
              მოიცავს მთავარ სექციებს, ნავიგაციას.
            </p>
          </div>
          <div className='flex justify-between'>
            <img src={prof} alt="" />
            <div className='flex items-center gap-[4px]'>
            <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.08086 2.25977C1.87258 2.25977 0.880859 3.25148 0.880859 4.45977V15.0198C0.880859 16.228 1.87258 17.2198 3.08086 17.2198H4.88211C4.94227 17.7491 4.93539 18.239 4.79961 18.6498C4.63289 19.1551 4.3218 19.5796 3.74086 19.9285C3.57758 20.0316 3.50195 20.2293 3.5518 20.4149C3.60164 20.6005 3.76836 20.7329 3.96086 20.7398C5.82742 20.7398 7.96727 19.7652 9.04836 17.2198H18.9209C20.1291 17.2198 21.1209 16.228 21.1209 15.0198V4.45977C21.1209 3.25148 20.1291 2.25977 18.9209 2.25977H3.08086ZM3.08086 3.13977H18.9209C19.6496 3.13977 20.2409 3.73102 20.2409 4.45977V15.0198C20.2409 15.7485 19.6496 16.3398 18.9209 16.3398H8.80086C8.61695 16.3398 8.45195 16.4549 8.38836 16.6285C7.7043 18.4951 6.48227 19.3837 5.21211 19.7085C5.38398 19.4627 5.54727 19.2032 5.63836 18.9248C5.86695 18.2304 5.84805 17.4707 5.70711 16.6973C5.66758 16.4927 5.49055 16.3432 5.28086 16.3398H3.08086C2.35211 16.3398 1.76086 15.7485 1.76086 15.0198V4.45977C1.76086 3.73102 2.35211 3.13977 3.08086 3.13977Z" fill="#212529"/>
</svg>

              <p className='text-[14px] text-[#212529]'>8</p>
            </div>
          </div>
          </div>
          
          </div>
   )
   
    })}

    </div>
    
    </div>

    </>
  )
}

export default App