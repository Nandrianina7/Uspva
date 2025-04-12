import { Box, Button, Select, TextField } from "@mui/material"
import { red } from "@mui/material/colors";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import api from "../../Api/api";

interface IProps {};
interface UserInput {
  type: string | undefined
  label: string;
  name: keyof typeof defaultFormdata;

}
const defaultFormdata = {
  user_name: '',
  firstname: '',
  email: '',
  password: '',
}
const Signup: React.FC<IProps> = () => {
  const [ formData, setFormData ] = useState(defaultFormdata)
   const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  const inputVal: UserInput[] = [
    {type: 'text',label: 'Name', name: 'user_name'},
    {type: 'text',label: 'Firstname', name: 'firstname'},
    {type: 'text' ,label: 'Email', name: 'email'},
    {type: 'password', label: 'Password', name: 'password' }
  ];
  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    api.post('http://localhost:5000/api/signup', formData, {withCredentials: true})
      .then(resp => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error.error);
      })
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '200px'}}>
      {inputVal.map((item, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
            <label>{item.label}</label>
            <TextField 
            label={item.label}
            id={item.name} 
            type={item.type} 
            name={item.name} 
            value={formData[item.name]} 
            onChange={handleInput}
          />
          </div>
      ))}
      {/* <Select>
        <option></option>
      </Select> */}
      <Button onClick={handleClick}>Signup</Button>
    </Box>
  )
}
export default Signup;