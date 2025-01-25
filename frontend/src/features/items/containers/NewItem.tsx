import ItemForm from "../components/ItemForm";
import { ItemMutation } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { createItem } from "../itemsThunks";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { selectCreateLoading } from "../itemsSlice";

const NewItem = () => {
  const dispatch = useAppDispatch();
  const isCreateLoading = useAppSelector(selectCreateLoading);
  const navigate = useNavigate();

  const onSubmitForm = async (item: ItemMutation) => {
    try {
      await dispatch(createItem(item)).unwrap();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {isCreateLoading ? (
        <CircularProgress />
      ) : (
        <ItemForm onSubmit={onSubmitForm} />
      )}
    </>
  );
};

export default NewItem;
