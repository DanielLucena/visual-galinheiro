import React, { useState } from "react";
import { db } from "../../utils/firebase";
import {
  Timestamp,
  collection,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export default function Tabela() {
  //   const [registros, setRegistros] = useState([]);
  //   const [id, setId] = useState(19);

  //   const getRegistros = async () => {
  //     const collectionRef = collection(db, "No");
  //     const agora = Timestamp.now;
  //     const q = query(
  //       collectionRef,
  //       where("id", "==", id),
  //       orderBy("timestamp", "desc"),
  //       limit(3)
  //     );
  //   };
  return <div>a</div>;
}
