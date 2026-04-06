// src/components/UsersAdminManager.jsx
import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, Avatar, Stack, IconButton, Menu, MenuItem,
  Tooltip, Chip, Dialog, DialogTitle, DialogActions, Button,
} from "@mui/material";
import {
  MoreVert as MoreIcon,
  PersonAdd as PromoteIcon,
  Block as BlockIcon,
  Person as UserIcon,
} from "@mui/icons-material";
import ProfileModal from "../ProfileModal";

export default function UsersAdminManager() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(stored);
  }, []);

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const isSuperAdmin = selectedUser?.role === "superadmin";

  // ✅ FIXED — removed setSelectedUser(null)
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action) => {
    if (!selectedUser) return;

    if (action === "block") {
      const updated = users.map((u) =>
        u.email === selectedUser.email ? { ...u, blocked: !u.blocked } : u
      );
      localStorage.setItem("users", JSON.stringify(updated));
      setUsers(updated);
    } else if (action === "promote") {
      const updated = users.map((u) =>
        u.email === selectedUser.email ? { ...u, role: "admin" } : u
      );
      localStorage.setItem("users", JSON.stringify(updated));
      setUsers(updated);
    } else if (action === "view") {
      setProfileModalOpen(true);
    } else if (action === "delete") {
      setDeleteDialogOpen(true);
    }

    handleMenuClose();
  };

  const confirmDelete = () => {
    const updated = users.filter((u) => u.email !== selectedUser.email);
    localStorage.setItem("users", JSON.stringify(updated));
    setUsers(updated);
    setDeleteDialogOpen(false);
  };

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRows = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const paginated = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          overflow: "hidden",
          p: 3,
          bgcolor: "#fff",
          borderRadius: "1rem",
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <h2 className="text-black font-semibold text-xl">Users & Admins</h2>
        </Stack>

        <TableContainer sx={{ maxHeight: 800, overflowX: "auto" }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Registration</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginated.map((user, index) => (
                <TableRow hover key={index}>
                  <TableCell>
                    <Avatar
                      sx={{ bgcolor: "#6b21a8" }}
                      src={user.profile?.profileImage || undefined} // use profile image if available
                    >
                      {!user.profile?.profileImage && (  // fallback if no image
                        user.profile?.gender === "male" ? (
                          <UserIcon /> // male default
                        ) : user.profile?.gender === "female" ? (
                          <UserIcon /> // female default (same icon here)
                        ) : (
                          user.fullName?.charAt(0).toUpperCase() || <UserIcon />
                        )
                      )}
                    </Avatar>

                  </TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      color={
                        user.role === "superadmin"
                          ? "error"
                          : user.role === "admin"
                          ? "warning"
                          : "success"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.blocked ? "Blocked" : "Active"}
                      color={user.blocked ? "error" : "success"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.fullyRegistered ? "Complete" : "Incomplete"}
                      color={user.fullyRegistered ? "primary" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="More actions">
                      <IconButton
                        onClick={(e) => handleMenuClick(e, user)}
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
          count={users.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRows}
          rowsPerPageOptions={[5, 10, 15, 20]}
        />

        {/* Menu Actions */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          {/* View is always enabled */}
          <MenuItem onClick={() => handleAction("view")}>View Profile</MenuItem>

          {/* Promote to Admin - disabled for superadmin */}
          <MenuItem
            onClick={() => handleAction("promote")}
            disabled={isSuperAdmin || selectedUser?.role !== "user"}
          >
            <PromoteIcon fontSize="small" sx={{ mr: 1 }} /> Promote to Admin
          </MenuItem>

          {/* Block/Unblock - disabled for superadmin */}
          <MenuItem
            onClick={() => handleAction("block")}
            disabled={isSuperAdmin}
          >
            <BlockIcon fontSize="small" sx={{ mr: 1 }} />
            {selectedUser?.blocked ? "Unblock" : "Block"}
          </MenuItem>

          {/* Delete - disabled for superadmin */}
          <MenuItem
            onClick={() => handleAction("delete")}
            sx={{ color: "red" }}
            disabled={isSuperAdmin}
          >
            Delete User
          </MenuItem>
        </Menu>


        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button color="error" onClick={confirmDelete}>Delete</Button>
          </DialogActions>
        </Dialog>

        {/* Profile Modal */}
        {profileModalOpen && selectedUser && (
          <ProfileModal user={selectedUser} onClose={() => setProfileModalOpen(false)} />
        )}
      </Paper>
    </div>
  );
}
