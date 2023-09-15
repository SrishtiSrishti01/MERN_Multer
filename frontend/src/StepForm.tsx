import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form'


type FormData = {
  firstName: string,
  lastName: string,
  age: string,
  email: string,
  password: string,
  image: FileList
}

// const INITIAL_DATA : FormData= {
//   firstName: "",
//   lastName :"",
//   age:"",
//   email:"",
//   password:"",
//   image: {
//     lastModified: 0,
//     name: "",
//     webkitRelativePath: "",
//     size: 0,
//     type: "",
//     arrayBuffer: function (): Promise<ArrayBuffer> {
//       throw new Error("Function not implemented.")
//     },
//     slice: function (start?: number | undefined, end?: number | undefined, contentType?: string | undefined): Blob {
//       throw new Error("Function not implemented.")
//     },
//     stream: function (): ReadableStream<Uint8Array> {
//       throw new Error("Function not implemented.")
//     },
//     text: function (): Promise<string> {
//       throw new Error("Function not implemented.")
//     }
//   }
// }

function StepForm() {
  const [step, setStep] = useState([true, false]);

  const form = useForm<FormData>();
  const { register, handleSubmit } = form;

  const onSubmit = (data: FormData) => {
    // const img = data.image?.[0]
    // console.log(img);

    // console.log(typeof(data.age))
    const payload = new FormData()

    
    payload.append('firstName', data.firstName)
    payload.append('lastName', data.lastName)
    payload.append('age', data.age)
    payload.append('email', data.email)
    payload.append('password', data.password)
    for (let i = 0; i < data.image.length; i++) {
      payload.append('images', data.image[i]);
    } 
    // payload.append('image', )
    
    // const data2 = {...data, image:img}
    
// console.log(payload)
// console.log(data)
    axios.post('http://localhost:8080/submit',  payload)
  }

  return (
    <form   encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
      <h1>User Details</h1>

      {step[0] && 
      <>
        <div>
        <label>First Name</label>
        <input autoFocus required type="text" id="firstName" {...register("firstName")} />

        </div>
        <div>

        <label>Last Name</label>
        <input required type="text" id="lastName" {...register("lastName")} />
        </div>
        <div>

        <label>Age</label>
        <input autoFocus min={1} type="number" id="age" {...register("age")} />
        </div>
        <button type = "button" onClick={()=>setStep([false, true])}>Next</button>
      </>
      }

      {step[1] && 
      <>
      <div>

        <label>Email</label>
        <input autoFocus required type="email" id="email" {...register("email")} />
      </div>
      <div>

        <label>Password</label>
        <input required type="password" id="password" {...register("password")} />
      </div>
      <div>

        <label>Image</label>
        <input required type="file" accept="image/*" multiple id="image" {...register("image")} />
      </div>
        <button type = "button" onClick={()=>setStep([true, false])}>Back</button>
        <button type="submit">Submit</button>
      </>
      }

    </form>
  )
}

export default StepForm