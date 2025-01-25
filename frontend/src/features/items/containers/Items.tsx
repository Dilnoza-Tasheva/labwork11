import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchItems } from "../itemsThunks";
import { selectFetchLoading, selectItems } from "../itemsSlice";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import OneItem from "../components/OneItem";

const categories = ["All items", "Electronics", "Furniture", "Clothing"];

const Items = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const loading = useAppSelector(selectFetchLoading);
  const location = useLocation();

  const category = new URLSearchParams(location.search).get("category") || "All items";

  useEffect(() => {
    dispatch(fetchItems(category === "All items" ? undefined : category));
  }, [dispatch, category]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", padding: 2 }}>
      <Paper elevation={3} sx={{ width: 240, marginRight: 3 }}>
        <Typography variant="h6" align="center" sx={{ padding: 2 }}>
          Categories
        </Typography>
        <List>
          {categories.map((cat) => (
            <ListItem key={cat} disablePadding>
              <ListItemButton
                component={Link}
                to={cat === "All items" ? "/" : `/?category=${cat}`}
                selected={category === cat}
              >
                <ListItemText primary={cat} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          {category}
        </Typography>
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid size={{xs:12}} key={item._id}>
              <OneItem
                id={item._id}
                title={item.title}
                price={item.price}
                image={item.image}
                category={item.category}
                seller={item.seller}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Items;
