# Sonic Design Photo Carousel

> A RESTful API that will display property rental information.

## Related Projects

  - https://github.com/Sonic-Design/reviews
  - https://github.com/Sonic-Design/checkout-calendar
  - https://github.com/Sonic-Design/photoGallery

## Table of Contents

* [API](#API)
  * [GET `/api/properties/:propertyId/nearby`](#GET-apipropertiespropertyidnearby)
  * [POST `/api/properties`](#POST-apiproperties)
* [Database management system](#Database-management-system)
* [Database schema](#Database-schema)
  * [Table 1](#Table-1)
  * [Table 2](#Table-2)
  * [Table 3](#Table-3)
* [Under construction: API](#Under-construction-API)
  * [POST `/api/users/:userId/lists`](#POST-apiusersuserIdlists)
  * [POST `/api/users/:userId/lists/:listId`](#POST-apiusersuserIdlistslistId)
  * [DELETE `/api/users/:userId/lists/:listId`](#DELETE-apiusersuserIdlistslistId)
* [Under construction: Database schema](#Under-construction-Database-schema)
  * [Table 4](#Table-4)
  * [Table 5](#Table-5)
* [Legacy](#Legacy)

## API

### **GET `/api/properties/:propertyId/nearby`**

* Operation:
  * Retrieve data for properties that are nearby current property
* Route parameter:
  * `:propertyId`: ID number for the current property
* Response:
  * Code on success:
    * 200
  * Fields:
    * `origin_property_id`: Number
    * `id`: Number
    * `average_rating`: Number
    * `review_count`: Number
    * `bed_count`: Number
    * `house_type`: String
    * `nightly_price`: Number
    * `image_name`: String
    * `image_description`: String
    * `image_url`: String
    * `host_id`: Number
    * `is_superhost`: Boolean
  * Example:
    ```json
    [
        {
            "origin_property_id": 42,
            "id": 8452739,
            "average_rating": "4.11",
            "review_count": 389,
            "bed_count": 3,
            "house_type": "p",
            "nightly_price": "583.29",
            "image_name": "Principal",
            "image_description": "transmit Mobility",
            "image_url": "https://imgazou.s3-us-west-1.amazonaws.com/img1/img-885.jpg",
            "host_id": 550159,
            "is_superhost": false
        },
        {
            "origin_property_id": 42,
            "id": 9333283,
            "average_rating": "2.46",
            "review_count": 279,
            "bed_count": 1,
            "house_type": "n",
            "nightly_price": "261.06",
            "image_name": "optimal",
            "image_description": "morph Connecticut",
            "image_url": "https://imgazou.s3-us-west-1.amazonaws.com/img1/img-115.jpg",
            "host_id": 198880,
            "is_superhost": false
        },
        {
            "origin_property_id": 42,
            "id": 5647896,
            "average_rating": "1.82",
            "review_count": 315,
            "bed_count": 3,
            "house_type": "c",
            "nightly_price": "121.09",
            "image_name": "North",
            "image_description": "Kentucky",
            "image_url": "https://imgazou.s3-us-west-1.amazonaws.com/img1/img-118.jpg",
            "host_id": 837886,
            "is_superhost": true
        }
    ]
    ```

### **POST `/api/properties`**

* Operation:
  * Add new property listing
* Request body:
  ```json
  {
    "averageRating": "<number>",
    "reviewCount": "<number>",
    "bedCount": "<number>",
    "houseType": "<string>",
    "nightlyPrice": "<number>",
    "imageName": "<string>",
    "imageDescription": "<string>",
    "imageUrl": "<string>",
    "hostId": "<number>"
  }
  ```
* Response:
  * Code on success:
    * 201

## Database management system

* PostgreSQL

## Database schema

### Table 1

<table>
  <thead style="text-align: center">
    <tr>
      <td colspan="3">
        <strong><code>users</code></strong>
      </td>
    </tr>
    <tr>
      <td>
        <strong>Field</strong>
      </td>
      <td>
        <strong>Type</strong>
      </td>
      <td>
        <strong>Ref</strong>
      </td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>id</code>
      </td>
      <td>
        <code>serial PRIMARY KEY</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>name</code>
      </td>
      <td>
        <code>varchar(200)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>email</code>
      </td>
      <td>
        <code>varchar(200)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>password</code>
      </td>
      <td>
        <code>varchar(200)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>role</code>
      </td>
      <td>
        <code>varchar(10)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>is_superhost</code>
      </td>
      <td>
        <code>boolean</code>
      </td>
      <td>
      </td>
    </tr>
  </tbody>
</table>

### Table 2

<table>
  <thead style="text-align: center">
    <tr>
      <td colspan="3">
        <strong><code>properties</code></strong>
      </td>
    </tr>
    <tr>
      <td>
        <strong>Field</strong>
      </td>
      <td>
        <strong>Type</strong>
      </td>
      <td>
        <strong>Ref</strong>
      </td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>id</code>
      </td>
      <td>
        <code>serial PRIMARY KEY</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>average_rating</code>
      </td>
      <td>
        <code>numeric(3,2)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>review_count</code>
      </td>
      <td>
        <code>int</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>bed_count</code>
      </td>
      <td>
        <code>smallint</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>house_type</code>
      </td>
      <td>
        <code>varchar(10)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>nightly_price</code>
      </td>
      <td>
        <code>numeric(7,2)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>image_name</code>
      </td>
      <td>
        <code>varchar(50)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>image_description</code>
      </td>
      <td>
        <code>varchar(200)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>image_url</code>
      </td>
      <td>
        <code>varchar(200)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>host_id</code>
      </td>
      <td>
        <code>int REFERENCES</code>
      </td>
      <td>
        <code>users(id)</code>
      </td>
    </tr>
  </tbody>
</table>

### Table 3

<table>
  <thead style="text-align: center">
    <tr>
      <td colspan="3">
        <strong><code>nearby_properties</code></strong>
      </td>
    </tr>
    <tr>
      <td>
        <strong>Field</strong>
      </td>
      <td>
        <strong>Type</strong>
      </td>
      <td>
        <strong>Ref</strong>
      </td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>id</code>
      </td>
      <td>
        <code>serial PRIMARY KEY</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>origin_property_id</code>
      </td>
      <td>
        <code>int REFERENCES</code>
      </td>
      <td>
        <code>properties(id)</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>nearby_property_id</code>
      </td>
      <td>
        <code>int REFERENCES</code>
      </td>
      <td>
        <code>properties(id)</code>
      </td>
    </tr>
  </tbody>
</table>

## Under construction: API

### **GET `/api/users/:userId/lists`**

* Operation:
  * Retrieve lists of properties
* Route parameter:
  * `:userId`: User ID number
* Response:
  * Code on success:
    * 200
  * Fields:
    * *(under construction)*

### **POST `/api/users/:userId/lists`**

* Operation:
  * Add new list and associate property with list
* Route parameter:
  * `:userId`: User ID number
* Request body:
  ```json
  {
    "name": "<string>",
    "propertyId": "<number>"
  }
  ```
* Response:
  * Code on success:
    * 201

### **POST `/api/users/:userId/lists/:listId`**

* Operation:
  * Add new association between property and list
* Route parameters:
  * `:userId`: User ID number
  * `:listId`: List ID number
* Request body:
  ```json
  {
    "propertyId": "<number>"
  }
  ```
* Response:
  * Code on success:
    * 201

### **DELETE `/api/users/:userId/lists/:listId`**

* Operation:
  * Remove association between property and list
* Route parameters:
  * `:userId`: User ID number
  * `:listId`: List ID number
* Request body:
  ```json
  {
    "propertyId": "<number>"
  }
  ```
* Response:
  * Code on success:
    * 204

## Under construction: Database schema

### Table 4

<table>
  <thead style="text-align: center">
    <tr>
      <td colspan="3">
        <strong><code>lists</code></strong>
      </td>
    </tr>
    <tr>
      <td>
        <strong>Field</strong>
      </td>
      <td>
        <strong>Type</strong>
      </td>
      <td>
        <strong>Ref</strong>
      </td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>id</code>
      </td>
      <td>
        <code>serial PRIMARY KEY</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>name</code>
      </td>
      <td>
        <code>varchar(50)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>image_url</code>
      </td>
      <td>
        <code>varchar(200)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>user_id</code>
      </td>
      <td>
        <code>int REFERENCES</code>
      </td>
      <td>
        <code>users(id)</code>
      </td>
    </tr>
  </tbody>
</table>

### Table 5

<table>
  <thead style="text-align: center">
    <tr>
      <td colspan="3">
        <strong><code>properties_lists</code></strong>
      </td>
    </tr>
    <tr>
      <td>
        <strong>Field</strong>
      </td>
      <td>
        <strong>Type</strong>
      </td>
      <td>
        <strong>Ref</strong>
      </td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>id</code>
      </td>
      <td>
        <code>serial PRIMARY KEY</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>property_id</code>
      </td>
      <td>
        <code>int REFERENCES</code>
      </td>
      <td>
        <code>properties(id)</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>list_id</code>
      </td>
      <td>
        <code>int REFERENCES</code>
      </td>
      <td>
        <code>lists(id)</code>
      </td>
    </tr>
  </tbody>
</table>

## Legacy

### Usage

> Some usage instructions

### Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- `@babel/core 7.12.10`
- `@babel/plugin-transform-runtime 7.12.10`
- `@babel/preset-env 7.12.11`
- `@babel/preset-react 7.12.10`
- `@babel/runtime 7.12.5`
- `axios 0.21.1`
- `babel-jest 26.6.3`
- `babel-loader 8.2.2`
- `babel-plugin-styled-components 1.12.0`
- `body-parser 1.19.0`
- `compression 1.7.4`
- `express 4.17.1`
- `faker 5.1.0`
- `mongoose 5.11.11`
- `prop-types 15.7.2`
- `react 16.14.0`
- `react-dom 16.14.0`
- `styled-components 5.2.1`
- `webpack 5.18.0`
- `webpack-cli 4.4.0`

### Development

#### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

