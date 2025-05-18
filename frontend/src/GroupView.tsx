import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Box, Button, Card, CardContent, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

interface Member {
  id: number;
  name: string;
  debt: number;
}

interface GroupFull {
  id: number;
  title: string;
  members: Member[];
}

interface MemberCardProps {
  member?: Member
}

interface AddMemberDialogProps {
  open: boolean;
  members: Member[];
  setOpen: (value: boolean) => void;
  groupId: number;
}

function AddMember(props: AddMemberDialogProps) {
  const [name, setName] = useState('');

  function closeAddMember() {
    props.setOpen(false);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    try {
      const response = await axios.post(`/api/groups/${props.groupId}/members`, { "name": name });
      props.members.push(response.data)
      setName('');
    } catch (error) {
      console.error("failed to add member");
    }
    closeAddMember();
  }

  return (
    <Dialog open={props.open} onClose={closeAddMember} fullWidth={true} maxWidth="xs" slotProps={{
      paper: {
        component: "form",
        onSubmit: (handleSubmit)
      }
    }}>
      <DialogTitle>
        Add member
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          id="name"
          label="Member's name"
          margin="dense"
          fullWidth
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeAddMember}>Cancel</Button>
        <Button type="submit" variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>);
}


function MemberCard(props: MemberCardProps) {
  if (!props.member) {
    return <></>
  }
  return <Card variant="outlined" sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="h3" fontSize={20}>
        {props.member.name}
      </Typography>
      <Typography>
        Owes: {props.member.debt}
      </Typography>
      <Button>Settle</Button>
    </CardContent>
  </Card>
}

function GroupView() {
  const { groupId } = useParams();
  const [group, setGroup] = useState<GroupFull | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [addMemberOpen, setAddMenberOpen] = useState<boolean>(false)
  const [members, setMembers] = useState<Member[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get<GroupFull>(`/api/groups/${groupId}`)
      .then(response => {
        setGroup(response.data);
        if (group) {
          setMembers(group.members)
        }
      }).catch((err) => {
        console.error(err)
        setError(err.message);
      });
  })
  if (error) {
    return <div>Error loading group members: {error}</div>;
  }


  return (<Container>
    <Stack direction="row" sx={{ width: "100%", flexWrap: "wrap" }} alignItems="center">
      <Button onClick={() => navigate('/')}>
        <ArrowBackOutlinedIcon color="info" />
      </Button>
      <Typography variant="h1" fontSize={32} padding={2} sx={{ marginRight: "auto" }}>
        {group?.title}
      </Typography>
      <Box>
        <Button
          variant="outlined"
          onClick={() => setAddMenberOpen(true)}
          sx={{ margin: 1, flexGrow: 1 }}>Add Member</Button>
        <Button
          variant="outlined"
          sx={{ margin: 1, flexGrow: 1 }}>New Transaction</Button>
      </Box>
    </Stack>
    <Typography variant="h2" fontSize={28} marginTop={2}>
      Members
    </Typography>
    <Grid container spacing={1} columns={4} alignItems="stretch">
      {members.map((m) => (
        <Grid size={{ xs: 4, sm: 2, md: 1 }} key={m.id}>
          <MemberCard member={m} />
        </Grid>
      ))}
    </Grid>
    <Typography variant="h2" fontSize={28} marginTop={2}>
      Transactions
    </Typography>
    <AddMember open={addMemberOpen} members={members} setOpen={setAddMenberOpen} groupId={Number(groupId)} />
  </Container>);
}

export default GroupView;
