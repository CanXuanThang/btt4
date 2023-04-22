import { Dispatch, useEffect, useState } from "react";
import { Photo } from "../redux/types";
import "./ListPhoto.css";
import PhotoItem from "./PhotoItem";
import { useDispatch } from "react-redux";
import { fetchData, valueOldTodo } from "../redux/actions";
import { useSelector } from "react-redux";

function ListPhoto() {
  const data = useSelector((state: any) => state.data.data);
  const [loadData, setLoadData] = useState(10);
  const dispatch: Dispatch<any> = useDispatch();
  const [disable, setDisable] = useState<boolean>(true);
  const [idNumber, SetIdNumber] = useState<number>(0);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    window.onscroll = () => {
      const windowHeight = window.innerHeight;

      const scrollY = window.scrollY || window.pageYOffset;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollY + windowHeight >= fullHeight) {
        setLoadData(loadData + 10);
      }
    };
    dispatch(fetchData(loadData));
  }, [loadData, setLoadData, dispatch]);

  const handleButton = () => {
    setDisable(true);
  };

  const HandleClick = () => {
    const value = localStorage.getItem(JSON.stringify(idNumber));
    value && dispatch(valueOldTodo(idNumber, value));
    value && setName(value);
    setDisable(true);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center fixed-top">
        <button
          disabled={disable}
          onClick={handleButton}
          className="btn btn-primary mx-3 btn-lg"
        >
          Xác nhận
        </button>
        <button
          disabled={disable}
          onClick={HandleClick}
          className="btn btn-primary btn-lg"
        >
          Reset
        </button>
      </div>
      {data &&
        data.map((arr: Photo) => (
          <PhotoItem
            key={arr.id}
            id={arr.id}
            value={arr.value}
            setName={setName}
            setId={SetIdNumber}
            setDisable={setDisable}
            thumbnailUrl={arr.thumbnailUrl}
            title={arr.title}
            name={arr.id === idNumber ? name : null}
          />
        ))}
    </div>
  );
}

export default ListPhoto;
