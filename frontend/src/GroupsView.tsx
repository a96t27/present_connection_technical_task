import axios from "axios";
import { Container, Typography, Card, CardContent, Grid, Dialog, DialogTitle, Button, Stack, DialogContent, TextField, DialogActions } from "@mui/material";

import { useState, useEffect } from "react";

interface Group {
  id: number;
  title: string;
}



interface GroupCardProps {
  group: Group;
}

function GroupCard(props: GroupCardProps) {
  return <Card variant="outlined" sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="h2" fontSize={20}>
        {props.group.title}
      </Typography>
      <Typography>
        Text
      </Typography>
    </CardContent>
  </Card>
}

function Groups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAddGroupDialogOpen, setIsAddGroupDialogOpen] = useState<boolean>(false);

  function openAddGroup() {
    setIsAddGroupDialogOpen(true);
  }


  useEffect(() => {
    axios.get<Group[]>('/api/groups')
      .then(response => {
        setGroups(response.data);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      });
  }, [])

  if (error) {
    return <div>Error loading groups: {error}</div>;
  }
  return (<Container>
    <Stack direction="row" sx={{ width: "100%" }} alignItems="center">
      <Typography variant="h1" fontSize={32} padding={2}>
        Groups
      </Typography>
      <Button
        onClick={openAddGroup}
        variant="outlined"
        sx={{ marginLeft: "auto" }}>Add group</Button>
    </Stack>
    <Grid container spacing={1} columns={4} alignItems="stretch">
      {groups.map((g) => (
        <Grid size={{ xs: 4, sm: 2, md: 1 }} key={g.id}>
          <GroupCard group={g} />
        </Grid>
      ))}
    </Grid>
    <AddGroup
      open={isAddGroupDialogOpen}
      setOpen={setIsAddGroupDialogOpen}
      groups={groups}
      setGroups={setGroups}
    />
  </Container>);
}

interface AddGroupDialogProps {
  open: boolean;
  groups: Group[];
  setGroups: (groups: Group[]) => void;
  setOpen: (value: boolean) => void;
}

function AddGroup(props: AddGroupDialogProps) {
  const [title, setTitle] = useState('');

  function closeAddGroup() {
    props.setOpen(false)
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    try {
      const response = await axios.post('/api/groups', { "title": title });
      props.groups.push(response.data)
      setTitle('');
    } catch (error) {
      console.error("failed to add group");
    }
    closeAddGroup()
  }

  return (
    <Dialog open={props.open} onClose={closeAddGroup} fullWidth={true} maxWidth="xs" slotProps={{
      paper: {
        component: "form",
        onSubmit: (handleSubmit)
      }
    }}>
      <DialogTitle>
        Add group
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          id="title"
          label="Group title"
          margin="dense"
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeAddGroup}>Cancel</Button>
        <Button type="submit" variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>);
}

export default Groups
