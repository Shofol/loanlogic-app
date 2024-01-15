import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { theme } from "../../constants";
import ProgressCard from "../ProgressCard";

const Colocacion = () => {
  const [pieData, setPieData] = useState<any[]>([]);
  const [divisor, setDivisor] = useState(0);
  const [qoutient, setQoutient] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await api.get(`/stats/colocacion`);
    const progressValue: number =
      +response.data.data.dailyGoal > 0
        ? Math.round(
            (+response.data.data.totalRequestedAmount /
              +response.data.data.dailyGoal) *
              100
          )
        : 0;
    setQoutient(+response.data.data.totalRequestedAmount);
    setDivisor(+response.data.data.dailyGoal);
    setPieData([
      {
        value: progressValue,
        color: theme.COLORS.warning,
        text: `${progressValue}%`
      },
      {
        value: 100 - progressValue,
        color: theme.COLORS.bgColor,
        text: `${100 - progressValue}%`
      }
    ]);
  };

  return (
    <>
      {pieData && (
        <ProgressCard
          title="Colocación"
          pieData={pieData}
          divisor={divisor}
          qoutient={qoutient}
        />
      )}
    </>
  );
};

export default Colocacion;
