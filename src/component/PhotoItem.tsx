import { useEffect, useState } from "react";
import { Photo } from "../redux/types";
import { useDispatch } from "react-redux";
import { updateTodo, valueOldTodo } from "../redux/actions";
import React from "react";

interface Props {
  id: number;
  title: string;
  thumbnailUrl: string;
  setDisable: any;
  setId: any;
  name: string | null;
  value: string | null;
  setName: any;
}

const PhotoItem = React.memo((props: Props) => {
  const { id, title, thumbnailUrl, setDisable, setId, value, setName, name } =
    props;
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(title);
  const [textTess, settextTess] = useState(title);
  const dispatch = useDispatch();

  useEffect(() => {
    if (text !== props.title) {
      dispatch(updateTodo(id, text));
      const valueLocal = localStorage.getItem(JSON.stringify(id));

      if (valueLocal) {
        const valuet1 = localStorage.getItem(JSON.stringify(id + 1));
        if (valuet1) {
          localStorage.setItem(JSON.stringify(id), valuet1);

          localStorage.setItem(JSON.stringify(id + 1), text);
        } else {
          localStorage.setItem(JSON.stringify(id + 1), text);
        }
      } else {
        localStorage.setItem(JSON.stringify(id), text);
      }
    }
  }, [dispatch, id, text, props.title, setDisable]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(id);
    settextTess(e.target.value);
    if (e.target.value !== title) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  useEffect(() => {
    value && settextTess(value);
    setText(textTess);
  }, [value]);

  const handleBlur = () => {
    setEditing(false);
    setText(textTess);
  };

  return (
    <div>
      <ul className="list-group">
        <div
          className={`list-group-item mb-3 d-flex align-items-center ${
            id % 2 === 1 ? "" : "bg-secondary"
          }`}
        >
          <img src={thumbnailUrl} alt="" />
          <div className="mx-3">
            {editing ? (
              <input
                value={textTess}
                onChange={handleTextChange}
                onBlur={handleBlur}
                style={{ width: 400 }}
              />
            ) : (
              <label onClick={handleEditClick}>{textTess}</label>
            )}
            <div>{Date.now()}</div>
          </div>
        </div>
      </ul>
    </div>
  );
});

export default PhotoItem;
