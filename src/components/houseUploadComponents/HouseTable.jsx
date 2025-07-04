import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, Button, Avatar, Stack, IconButton, Menu, MenuItem,
  Tooltip, Chip, Dialog, DialogTitle, DialogActions
} from "@mui/material";
import {
  Add as AddIcon,
  MoreVert as MoreIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const columns = [
  { id: "image", label: "Image", minWidth: 70 },
  { id: "type", label: "House Name", minWidth: 120 },
  { id: "location", label: "Location", minWidth: 120 },
  { id: "price", label: "Price (FCFA)", minWidth: 100, align: "right" },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "Admin", label: "Admin", minWidth: 160 },
  { id: "actions", label: "Actions", minWidth: 80 },
];

export default function HouseTableMui({ houses }) {
  const navigate = useNavigate(); // ✅ Setup navigation
  const getInitialRowsPerPage = () => {
    const screenHeight = window.innerHeight;
    if (screenHeight > 1000) return 20;
    if (screenHeight > 800) return 15;
    if (screenHeight > 600) return 10;
    return 5;
  };

  const [rowsPerPage, setRowsPerPage] = useState(getInitialRowsPerPage());
  const [page, setPage] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [statuses, setStatuses] = useState(() =>
    houses.reduce((acc, house) => {
      acc[house.id] = "Available";
      return acc;
    }, {})
  );

  const handleMenuClick = (event, house) => {
    setAnchorEl(event.currentTarget);
    setSelectedHouse(house);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedHouse(null);
  };

  const handleAction = (action) => {
    if (!selectedHouse) return;

    if (action === "Delete") {
      setDeleteDialogOpen(true);
    } else {
      setStatuses((prev) => ({
        ...prev,
        [selectedHouse.id]: action,
      }));
      console.log(`✅ Status changed to '${action}' for house:`, selectedHouse);
      handleMenuClose();
    }
  };

  const confirmDelete = () => {
    console.warn("🗑 House deleted:", selectedHouse);
    setDeleteDialogOpen(false);
    handleMenuClose();
  };

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRows = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const paginated = houses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2, bgcolor: "#fff" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <h2 className="text-black">Houses</h2>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: "#6b21a8", "&:hover": { bgcolor: "#581c87" } }}
          onClick={() => navigate("/Admin/HouseUpload/uploadPage")} // ✅ Route to upload page
        >
          Upload House
        </Button>
      </Stack>

      <TableContainer sx={{ maxHeight: 900 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  align={col.align}
                  style={{
                    minWidth: col.minWidth,
                    color: "#000",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginated.map((house) => (
              <TableRow hover key={house.id}>
                <TableCell>
                  <Avatar variant="rounded" src={house.image} />
                </TableCell>
                <TableCell>{house.type}</TableCell>
                <TableCell>{house.location}</TableCell>
                <TableCell align="right" sx={{ pr: 6 }}>
                  {house.price.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={statuses[house.id]}
                    color={
                      statuses[house.id] === "Available"
                        ? "success"
                        : statuses[house.id] === "Unavailable"
                        ? "warning"
                        : "default"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ pl: 4 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar
                      src={house.postedBy.profilePic}
                      sx={{ width: 24, height: 24 }}
                    />
                    <span className="text-black">{house.postedBy.name}</span>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Tooltip title="More actions">
                    <IconButton
                      onClick={(e) => handleMenuClick(e, house)}
                      sx={{ color: "#6b21a8" }}
                    >
                      <MoreIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={houses.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRows}
        rowsPerPageOptions={[5, 10, 15, 20, 25]}
      />

      {/* Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <Tooltip title="Mark as Available" placement="left">
          <MenuItem onClick={() => handleAction("Available")}>Available</MenuItem>
        </Tooltip>
        <Tooltip title="Mark as Unavailable" placement="left">
          <MenuItem onClick={() => handleAction("Unavailable")}>Unavailable</MenuItem>
        </Tooltip>
        <Tooltip title="Delete this house" placement="left">
          <MenuItem onClick={() => handleAction("Delete")} sx={{ color: "red" }}>
            Delete
          </MenuItem>
        </Tooltip>
      </Menu>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>
          Are you sure you want to delete this house?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={confirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
