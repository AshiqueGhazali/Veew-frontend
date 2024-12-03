import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { getDashboardDatas } from "../../../api/admin";
import { IUser } from "../../../interface/userInterface";
import NewUsers from "../../../Components/admin/DashboardComponents/NewUsers";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const Dashboard: React.FC = () => {
  const [lastTenDays, setLastTenDaysData] = useState({
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: "column",
        dataPoints: [],
      },
    ],
  });
  const [eventsPerCategory, setCategories] = useState({
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: "doughnut",
        dataPoints: [],
      },
    ],
  });
  const [latestUsers, setLatestUsers] = useState<IUser[] | null>(null)
  const [lastMonthTransactions , setTransaction] = useState({
    data: [
    {
        type: "line",
        name: "Debit",
        showInLegend: true,
        yValueFormatString: "#,###°F",
        dataPoints: [
          { x: new Date('2024-11-08'), y: 100 },
          { x: new Date('2024-11-09'), y: 100 },
          { x: new Date('2024-11-11'), y: 20 },
          { x: new Date('2024-11-12'), y: 200 },
          { x: new Date('2024-11-27'), y: 500 }
        ]
    },
    {
        type: "line",
        name: "Credit",
        showInLegend: true,
        yValueFormatString: "#,###°F",
        dataPoints: [
          { x: new Date('2024-11-09'), y: 60 },
          { x: new Date('2024-11-12'), y: 220 }
        ]
    }
    ]
})

  useEffect(() => {
    const setDashboardDatas = async () => {
      try {
        const response = await getDashboardDatas();
        if (response.status === 200) {
          const eventPerDay = response.data.eventCountPerDay.map(
            (value: any) => {
              return {
                label: value.date,
                y: value.count,
              };
            }
          );

          const eventCountPerCategory = response.data.eventCountPerCategory.map(
            (value: any) => {
              return {
                label: value.category,
                y: value.count,
              };
            }
          );

          setLastTenDaysData((prev) => ({
            ...prev,
            data: [
              {
                ...prev.data[0],
                dataPoints: eventPerDay,
              },
            ],
          }));

          setCategories((prev) => ({
            ...prev,
            data: [
              {
                ...prev.data[0],
                dataPoints: eventCountPerCategory,
              },
            ],
          }));
        }

        setLatestUsers(response.data.latestUsers)

        const debitData = response.data.LastMonthTransactions.debitData.map((value:any)=>{
          return {
            x:new Date(value.date),
            y:Number(value.amount)
          }
        })
        const creditData = response.data.LastMonthTransactions.creditData.map((value:any)=>{
          return {
            x:new Date(value.date),
            y: Number(value.amount)
          }
        })
        

        setTransaction({
          data: [
            {
              type: "line",
              name: "Debit",
              showInLegend: true,
              yValueFormatString: "#,###",
              dataPoints: debitData,
            },
            {
              type: "line",
              name: "Credit",
              showInLegend: true,
              yValueFormatString: "#,###",
              dataPoints: creditData,
            },
          ],
        });
        
      } catch (error) {}
    };

    setDashboardDatas();

  }, []);

  useEffect(()=>{
    console.log(lastMonthTransactions);
    
  },[lastMonthTransactions])

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="md:col-span-2 bg-white p-6">
          <h3 className="uppercase text-[#27d095]">Events in last 10 days</h3>
          <CanvasJSChart options={lastTenDays} />
        </div>
        <div className="md:col-span-1 bg-white p-6">
          <h3 className="uppercase text-[#f54f5f]">Events Per Category</h3>
          <CanvasJSChart options={eventsPerCategory} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-2 bg-white p-6  ">
          <h3 className="uppercase text-[#910f5d]">new users</h3>
          <div className="max-h-[400px] overflow-y-scroll scrollbar-hide">
            <NewUsers people={latestUsers} />
          </div>
        </div>
        <div className="md:col-span-3 bg-white p-6  ">
          <h3 className="uppercase text-[#0c7869]">Transactions</h3>
          <div className="max-h-[400px] overflow-y-scroll scrollbar-hide">
            <CanvasJSChart options={lastMonthTransactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

