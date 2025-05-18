import { Box, Button, Container, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router";

const steps = ["Who paid", "Split type", "How to split"]


interface Group {
  members: Member[];
}

interface Member {
  id: number;
  name: string;
}

function NewTransactionView() {
  const { groupId } = useParams();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [paidBy, setPaidBy] = useState<number>();

  function handleNext() {
    if (activeStep == steps.length-1) {
      navigate(-1)
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  useEffect(() => {
    axios.get<Group>(`/api/groups/${groupId}`)
      .then(response => {
        const group: Group = response.data
        if (group && group.members) {
          setMembers(group.members)
        }
      }).catch((err) => {
        console.error(err);
        setError(err.message);
      });
  })


  return (<Container maxWidth='md'>
    <Typography variant="h1" fontSize={32} padding={2} sx={{ marginRight: "auto" }}>
      Add new transaction
    </Typography>
    <Stepper activeStep={activeStep}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>


    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
      <Button
        color="inherit"
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{ mr: 1 }}
      >
        Back
      </Button>
      <Button onClick={handleNext}>
        {activeStep == steps.length - 1 ? 'Finish' : 'Next'}
      </Button>
    </Box>

  </Container>);
}

export default NewTransactionView;
