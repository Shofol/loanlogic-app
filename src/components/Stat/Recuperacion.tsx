import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { theme } from "../../constants";
import ProgressCard from "../ProgressCard";

const Recuperacion = () => {
  const [pieData, setPieData] = useState<any[]>([]);
  const [divisor, setDivisor] = useState(0);
  const [qoutient, setQoutient] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await api.get(`/stats/debt_collections`);
    const progressValue: number =
      +response.data.data.total > 0
        ? Math.round(
            (+response.data.data.total_collected / +response.data.data.total) *
              100
          )
        : 0;
    setQoutient(+response.data.data.total_collected);
    setDivisor(+response.data.data.total);
    setPieData([
      {
        value: progressValue,
        color: theme.COLORS.danger,
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
          title="RECUPERACIÓN (sin incluir avances)"
          pieData={pieData}
          divisor={divisor}
          qoutient={qoutient}
        />
      )}
    </>
  );
};

export default Recuperacion;
