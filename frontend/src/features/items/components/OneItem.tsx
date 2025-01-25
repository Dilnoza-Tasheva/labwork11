import Grid from "@mui/material/Grid2";
import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { Link } from "react-router-dom";
import NoPictureImage from "../../../assets/noPicture.png";
import { apiUrl } from "../../../globalConstants.ts";

interface Props {
  title: string;
  price: number;
  id: string;
  image?: string | null | undefined;
  category: string;
  seller: string;
}

const OneItem: React.FC<Props> = ({ title, price, id, image, category }) => {
  let itemImage = NoPictureImage;

  if (image) {
    itemImage = apiUrl + "/" + image;
  }

  return (
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
      <Card>
        <CardHeader title={title} />
        <CardMedia
          style={{ width: "100%" }}
          component="img"
          image={itemImage}
          title={title}
        />

        <CardContent>
          <p><strong>Category: </strong>{category}</p>
          <p><strong>Price: </strong>{price} KGS</p>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={`/items/${id}`}>
            <ArrowForward />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default OneItem;
