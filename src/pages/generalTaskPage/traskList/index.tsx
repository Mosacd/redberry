import { useGetStatuses } from "@/reactQuery/query/statuses";
import { useGetTasks } from "@/reactQuery/query/tasks";
import dayjs from "dayjs";
import "dayjs/locale/ka";
import { Link } from "react-router-dom";

const formattedDate = (due_at: string) => {
  return dayjs(due_at).locale("ka").format("DD MMM, YYYY");
};

const TaskList: React.FC<{
  appliedDepartments: string[];
  appliedPriorities: string[];
  appliedEmployee: string | null;
}> = ({ appliedDepartments, appliedPriorities, appliedEmployee }) => {
  const { data: statuses = [] } = useGetStatuses();

  const { data: tasks = [], isLoading } = useGetTasks();

  if (isLoading) {
    return;
  }

  console.log(tasks[0].total_comments);

  const colorsProgress = ["#F7BC30", "#FB5607", "#FF006E", "#3A86FF"];
  const colorsPriority = ["#08A508", "#FFBE0B", "#FA4D4D"];
  const colorsDepartment = [
    "#FF66A8",
    "#FD9A6A",
    "#FFD86D",
    "#89B6FF",
    "#5FAA5B",
    "#D288C5",
    "#A3A65D",
  ];

  const filteredItems = tasks.filter((task) => {
    const matchesDepartment =
      appliedDepartments.length === 0 ||
      appliedDepartments.includes(task.department.name);
    const matchesPriority =
      appliedPriorities.length === 0 ||
      appliedPriorities.includes(task.priority.name);
    const matchesEmployee =
      !appliedEmployee || task.employee.name === appliedEmployee;

    return matchesDepartment && matchesPriority && matchesEmployee;
  });

  return (
    <div className="w-[1680px] flex justify-center gap-[52px] mt-[79px]">
      {statuses?.map((status, index) => {
        const filteredTasks = filteredItems?.filter(
          (task) => task.status.id === status.id
        );

        return (
          <div className="flex flex-col gap-[30px]" key={status.id}>
            <div
              className={`flex justify-center items-center py-[15px] h-[54px] w-[381px] rounded-[10px]`}
              style={{ backgroundColor: colorsProgress[index] }}
            >
              <h2 className="text-[20px] font-[500] text-[#FFFFFF]">
                {status.name}
              </h2>
            </div>
            {filteredTasks.length > 0 &&
              filteredTasks?.map((task) => {
                return (
                  <Link to={`/taskPage/${task.id}`}>
                    <div
                      key={task.id}
                      className={`flex flex-col justify-between items-center w-[381px] h-[217px] p-[20px] gap-[28px] rounded-[15px] hover:cursor-pointer transition-all duration-300 ease-in-out]`}
                      style={{
                        boxShadow: `0 0 0 1px ${colorsProgress[index]}`,
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.boxShadow = `0 0 0 2px ${colorsProgress[index]}`)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.boxShadow = `0 0 0 1px ${colorsProgress[index]}`)
                      }
                    >
                      <div className="flex justify-between w-[341px] items-center">
                        <div className="flex gap-[10px] items-center">
                          <div
                            className={`flex gap-[4px] items-center w-[86px] h-[26px] border-[0.5px] rounded-[5px] p-[4px] text-[12px] leading-[150%] font-[600]`}
                            style={{
                              borderColor: colorsPriority[task.priority.id - 1],
                              color: colorsPriority[task.priority.id - 1],
                            }}
                          >
                            <img src={task.priority.icon} alt="" />{" "}
                            {task.priority.name}
                          </div>
                          <div
                            className="w-[88px] h-[24px] text-[#FFFFFF] py-[5px] px-[9px] rounded-[15px] text-[12px] truncate"
                            style={{
                              backgroundColor:
                                colorsDepartment[task.department.id - 1],
                            }}
                          >
                            {task.department.name}
                          </div>
                        </div>
                        <p className="text-[12px]">
                          {formattedDate(task.due_date)}
                        </p>
                      </div>
                      <div className="flex flex-col justify-between h-[64px] gap-[12px] w-[320px] break-all overflow-auto">
                        <h2 className="font-[600] text-[15px] text-[#212529]">
                          {task.name}
                        </h2>
                        <p className="text-[14px] text-[#343A40]">
                          {task.description}
                        </p>
                      </div>
                      <div className="flex justify-between w-[341px]">
                        <img
                          src={task.employee.avatar}
                          alt=""
                          className="w-[31px] h-[31px] rounded-full"
                        />
                        <div className="flex items-center gap-[4px]">
                          <svg
                            width="22"
                            height="23"
                            viewBox="0 0 22 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.08086 2.25977C1.87258 2.25977 0.880859 3.25148 0.880859 4.45977V15.0198C0.880859 16.228 1.87258 17.2198 3.08086 17.2198H4.88211C4.94227 17.7491 4.93539 18.239 4.79961 18.6498C4.63289 19.1551 4.3218 19.5796 3.74086 19.9285C3.57758 20.0316 3.50195 20.2293 3.5518 20.4149C3.60164 20.6005 3.76836 20.7329 3.96086 20.7398C5.82742 20.7398 7.96727 19.7652 9.04836 17.2198H18.9209C20.1291 17.2198 21.1209 16.228 21.1209 15.0198V4.45977C21.1209 3.25148 20.1291 2.25977 18.9209 2.25977H3.08086ZM3.08086 3.13977H18.9209C19.6496 3.13977 20.2409 3.73102 20.2409 4.45977V15.0198C20.2409 15.7485 19.6496 16.3398 18.9209 16.3398H8.80086C8.61695 16.3398 8.45195 16.4549 8.38836 16.6285C7.7043 18.4951 6.48227 19.3837 5.21211 19.7085C5.38398 19.4627 5.54727 19.2032 5.63836 18.9248C5.86695 18.2304 5.84805 17.4707 5.70711 16.6973C5.66758 16.4927 5.49055 16.3432 5.28086 16.3398H3.08086C2.35211 16.3398 1.76086 15.7485 1.76086 15.0198V4.45977C1.76086 3.73102 2.35211 3.13977 3.08086 3.13977Z"
                              fill="#212529"
                            />
                          </svg>

                          <p className="text-[14px] text-[#212529]">
                            {task.total_comments}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
