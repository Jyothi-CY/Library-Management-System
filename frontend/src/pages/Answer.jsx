import { useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  Divider,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { useBookContext } from "../hooks/useBookContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "sonner";

export default function Answer() {
  const { state, dispatchb } = useBookContext();
  const { state: authState } = useAuthContext();
  const { user } = authState;
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];
  const queryId = location.pathname.split("/")[4];
  const book = state.books.find((book) => book._id == bookId);
  const query = book.queries.find((query) => query._id == queryId);
  const answers = query.answers;
  const [answer, setAnswer] = useState("");
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const handleAnswer = async (e) => {
    // onOpen();
    // e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/books/${bookId}/query/${queryId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ user_name: user.username, answer }),
        }
      );
      if (!response.ok) {
        toast.error("Failed to add answer");
      }
      const data = await response.json();
      dispatchb({
        type: "ADD_ANSWER",
        payload: { bookId, queryId, answer: data },
      });
      setAnswer("");
      onClose();
      toast.success("Answer added successfully");
    } catch (error) {
      toast.error("Failed to add answer");
      onClose();
    }
  };

  const handleUpvote = async (e, answerId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/books/${bookId}/query/${queryId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ answerId, user_name: user.username}),
        }
      );
      if (!response.ok) {
        toast.error("Failed to upvote answer ");
      }
      const data = await response.json();
      dispatchb({
        type: "UPVOTE_ANSWER",
        payload: { bookId, queryId, answerId, upvote: data },
      });
      toast.success("Answer upvoted successfully");
    } catch (error) {
      toast.error("Failed to upvote answer");
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Query</h1>
        </CardHeader>
        <CardBody>
          <div className="">
            <h1 className="text-xl font-semibold">{query.query}</h1>
            <Chip color="success" size="sm">
              Asked by: {query.user_name}
            </Chip>
          </div>
          <Divider className="m-1" />
          <h1 className="text-xl font-semibold">Answers</h1>
          {answers.map((answer) => (
            <Card key={answer._id} className="mt-2">
              <CardHeader>
                {/* <h1 className="text-lg font-semibold">Answer</h1> */}
              </CardHeader>
              <CardBody>
                <Chip color="danger" size="sm">
                  Answered by: {answer.user_name}
                </Chip>
                <p>{answer.answer}</p>
                <p>upvotes: {answer.upvotes}</p>
                <Button variant="flat" onPress={(e) => handleUpvote(e, answer._id)}>Upvote</Button>
              </CardBody>
            </Card>
            // every answer should have a button to upvote
          ))}
          <Button onPress={onOpen} className="mt-4" color="secondary" size="md">
            Answer This Query
          </Button>
        </CardBody>
      </Card>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        onClose={onClose}
        title="Answer"
        actions={[
          <Button onPress={handleAnswer} color="success" key="1">
            Answer
          </Button>,
        ]}
      >
        <ModalContent>
          <ModalHeader>Answer</ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              placeholder="Answer here"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onPress={onClose} variant="flat">
              Close
            </Button>
            <Button color="success" onPress={handleAnswer} variant="shadow">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
