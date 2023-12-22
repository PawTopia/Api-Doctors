# Helper PawTopia
This API is under **_development_** but almost 60% covered all need on our application,like CRUD doctor or map, for futher research we will intergration with database for transaction
![image](https://github.com/PawTopia/Helper-api-pawtopia/assets/114970828/05d5fa74-f3b3-43f8-83b5-eb7c798ca67a)
## Starting URL
- https://helper-dot-pawtopia-405619.et.r.appspot.com/Api
  ### Route
  for route here just add it after `/Api`
  - GET, POST : /doctors
  - DELETE : /doctors/delete
  - GET : /doctors/rating/highest
  - GET : /doctors/rating/lowest
  - GET : /clinic
## Content Type
- application/json; charset=utf-8
----
# Helper-doctor
  ## Method
  <details>
    <summary>GET Doctor</summary>
    

  ### URL
  - https://helper-dot-pawtopia-405619.et.r.appspot.com/Api/doctors
    - ### Request
    ```
    curl --location --request GET 'https://helper-dot-pawtopia-405619.et.r.appspot.com/Api/doctors?id=1%2C2%2C3'
    ```
    ---
    ```json
      {
      "Doctor": [
        {
          "id": 1,
          "name": "Dr. John Smith",
          "specialization": "Cardiologist",
          "biography": "Dr. John Smith is a highly experienced cardiologist with a focus on heart health. He has been practicing medicine for over 20 years and is dedicated to providing the best care for his patients.",
          "rating": 4.5,
          "patients": 15
        },
        {
          "id": 2,
          "name": "Dr. Emily Johnson",
          "specialization": "Pediatrician",
          "biography": "Dr. Emily Johnson is a compassionate pediatrician who loves working with children. She believes in creating a friendly and comfortable environment for her young patients to ensure they receive the best possible care.",
          "rating": 4.8,
          "patients": 12
        },
        ]
      }
    ```
this will get all data, but if you want specfic data or multiple, you can use query params
like this
- https://helper-dot-pawtopia-405619.et.r.appspot.com/Api/doctor?id=1,2
  </details>
<details>
  <summary>POST Doctor</summary>
  
  ### URL
  - https://helper-dot-pawtopia-405619.et.r.appspot.com/Api/doctors
  ### Request
  ```
  curl --location --request POST 'https://helper-dot-pawtopia-405619.et.r.appspot.com/Api/doctors' \
  --header 'Content-Type: application/json' \
  --data '{
      "id": 12,
        "name": "Dr. testing",
        "specialization": "testing specialization",
        "biography": "this is testing post doctor",
        "rating": 4.8,
        "patients": 20
  }'
  ```
  ---
  ```json
  {
    "success": "true",
    "message": "Doctor added successfully ",
    "doctors": {
      "id": 12,
      "name": "Dr. testing",
      "specialization": "testing specialization",
      "biography": "this is testing post doctor",
      "rating": 4.8,
      "patients": 20
    }
  }
  ```
</details>

<details>
  <summary>DELETE Doctor</summary>

  ### URL
  - https://helper-dot-pawtopia-405619.et.r.appspot.com/Api/doctors/delete?id=12
    to delete some data doctor you must know what `id` you want to delete
  ### Request
  ```
  
  ```
</details>
  



