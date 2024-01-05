import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { theme } from "../../constants";
import ProgressCard from "../ProgressCard";

const MoraStat = () => {
  const [pieData, setPieData] = useState<any[]>([]);
  const [divisor, setDivisor] = useState(0);
  const [qoutient, setQoutient] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await api.get(`/stats/default_amount`);
    const progressValue: number =
      +response.data.data.totalAmount > 0
        ? Math.round(
            (+response.data.data.totalDefault /
              +response.data.data.totalAmount) *
              100
          )
        : 0;
    console.log(progressValue);
    setQoutient(+response.data.data.totalDefault);
    setDivisor(+response.data.data.totalAmount);
    setPieData([
      {
        value: progressValue,
        color: theme.COLORS.linkColor,
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
          title="Mora"
          pieData={pieData}
          divisor={divisor}
          qoutient={qoutient}
        />
      )}
    </>
  );
};

export default MoraStat;
