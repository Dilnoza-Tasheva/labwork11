import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchItemById, deleteItem } from "../itemsThunks";
import { selectItemDetails, selectDeleteLoading, } from "../itemsSlice";
import { Box, Button, CircularProgress, Typography, Card, CardMedia, CardContent, } from "@mui/material";
import NoPictureImage from "../../../assets/noPicture.png";
import { apiUrl } from "../../../globalConstants.ts";

const ItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const item = useAppSelector(selectItemDetails);
  const deleteLoading = useAppSelector(selectDeleteLoading);
  const user = useAppSelector((state) => state.users.user);

  useEffect(() => {
    if (id) {
      dispatch(fetchItemById(id));
    }
  }, [dispatch, id]);

  if (!item) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const itemImage = item.image ? `${apiUrl}/${item.image}` : NoPictureImage;

  const handleDelete = async () => {
    if (id) {
      await dispatch(deleteItem(id));
      navigate("/");
    }
  };

  const sellerName =
    typeof item.seller === "object" && item.seller?.displayName
      ? item.seller.displayName
      : String(item.seller || "Unknown Seller");

  const sellerPhone =
    typeof user?.phone === "string" ? user.phone : "N/A";

  return (
    <Box sx={{ padding: 2 }}>
      <Card>
        <CardMedia component="img" image={itemImage} alt={item.title} />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {item.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Description:</strong> {item.description}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Price:</strong> {item.price} KGS
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Category:</strong> {item.category}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Seller Name:</strong> {sellerName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Seller Phone:</strong> {sellerPhone}
          </Typography>
          {user?._id === item.seller && (
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              {deleteLoading ? "Deleting..." : "Delete Item"}
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ItemDetails;
