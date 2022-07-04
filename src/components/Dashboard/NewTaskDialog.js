import {observer} from "mobx-react-lite";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormLabel,
    Select,
    TextField
} from "@material-ui/core";
import {useCallback, useState} from "react";
import useStore from "../../hooks/useStore";

function NewTaskDialog({ open, handleClose, activeSection }) {
    const [formState, setFormState] = useState({})
    const { users, boards } = useStore()

    const updateFormState = useCallback((event) => {
        const {name, value} = event.target

        setFormState(prevState => ({
            ...prevState,
        [name]: value
        }))
    }, [setFormState])

    const addNewTask = useCallback((event) => {
        event.preventDefault()
        boards.active.addTask(activeSection, formState)
        handleClose()
        setFormState({})
    }, [formState, boards, activeSection])

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                Creating a new task:
            </DialogTitle>
            <form onSubmit={addNewTask}>
                <DialogContent style={{minWidth: 500}}>
                    <Box p={1}>
                        <TextField
                            fullWidth
                            required
                            type="text"
                            label="Title"
                            name="title"
                            onChange={updateFormState}
                            value={formState?.title || ''}
                        />
                    </Box>
                    <Box p={1}>
                        <TextField
                            fullWidth
                            required
                            type="text"
                            label="Description"
                            name="description"
                            onChange={updateFormState}
                            value={formState?.description || ''}
                        />
                    </Box>
                    <Box p={1}>
                       <FormControl fullWidth>
                           <FormLabel shrink>
                               Assignee
                           </FormLabel>
                           <Select
                               required
                               native
                               name="assignee"
                               value={formState?.assignee || ''}
                               onChange={updateFormState}
                           >
                               <option value='' disabled>
                                   -
                               </option>
                               {users.list.map(user => {
                                   return (
                                       <option key={user.id} value={user.id}>
                                           {user?.name}
                                       </option>
                                   )
                               })}
                           </Select>
                       </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                    onClick={handleClose}
                    color="secondary"
                    >
                        Close
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                    >
                        Create
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default observer(NewTaskDialog)