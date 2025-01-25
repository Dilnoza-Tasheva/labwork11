import { ChangeEvent, FormEvent, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Button, FormControl, MenuItem, Select, SelectChangeEvent, TextField, } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { ItemMutation } from "../../../types";
import { CATEGORIES } from "../../../globalConstants.ts";
import FileInput from '../../../components/FileInput/FileInput.tsx';

interface Props {
  onSubmit: (item: ItemMutation) => void;
}

const initialState: ItemMutation = {
  title: "",
  description: "",
  image: null,
  price: 0,
  category: "",
  seller: "",
};

const ItemForm: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<ItemMutation>(initialState);

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ ...form });
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const selectChangeHandler = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid size={{ xs: 12 }}>
          <FormControl fullWidth>
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              id="category_id"
              value={form.category}
              name="category"
              required
              label="Category"
              onChange={selectChangeHandler}
            >
              <MenuItem value="" disabled>
                Select category
              </MenuItem>
              {CATEGORIES.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            id="title"
            name="title"
            label="Title"
            required
            value={form.title}
            onChange={inputChangeHandler}
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            id="price"
            name="price"
            label="Price"
            required
            value={form.price}
            onChange={inputChangeHandler}
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            multiline
            id="description"
            name="description"
            label="Description"
            value={form.description}
            onChange={inputChangeHandler}
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <FileInput
            name="image"
            label="Image"
            onGetFile={fileEventChangeHandler}
          />
        </Grid>

        <Grid>
          <Button type="submit" color="primary" variant="contained">
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ItemForm;
