import { Margin } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

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

function MemberCard(props: MemberCardProps) {
  if (!props.member) {
    return <></>
  }
  return <Card variant="outlined" sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="h2" fontSize={20}>
        {props.member.name}
      </Typography>
      <Typography>
        Owes: {props.member.debt}
      </Typography>
    </CardContent>
  </Card>
}
function GroupView() {
  const { groupId } = useParams();
  const [group, setGroup] = useState<GroupFull | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<GroupFull>(`/api/groups/${groupId}`)
      .then(response => {
        setGroup(response.data);
      }).catch((err) => {
        console.error(err)
        setError(err.message);
      });
  })
  if (error) {
    return <div>Error loading group members: {error}</div>;
  }

  const members: Member[] = group?.members ?? []

  return (<Container>
    <Stack direction="row" sx={{ width: "100%", flexWrap: "wrap" }} alignItems="center">
      <Typography variant="h1" fontSize={32} padding={2} sx={{ marginRight: "auto" }}>
        {group?.title}
      </Typography>
      <Box>
        <Button
          variant="outlined"
          sx={{ margin: 1 }}>Add Member</Button>
        <Button
          variant="outlined"
          sx={{ marginLeft: 1 }}>New Transaction</Button>
      </Box>
    </Stack>
    <Grid container spacing={1} columns={4} alignItems="stretch">
      {members.map((m) => (
        <Grid size={{ xs: 4, sm: 2, md: 1 }} key={m.id}>
          <MemberCard member={m} />
        </Grid>
      ))}
    </Grid>
  </Container>);
}

export default GroupView;
