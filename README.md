# HouseHub

> A RESTful API that will display home rental information.

## Related Projects

  - https://github.com/Sonic-Design/reviews
  - https://github.com/Sonic-Design/checkout-calendar
  - https://github.com/Sonic-Design/photoGallery

## Table of Contents

* [API](#API)
  * [/api/properties/:propertyId/nearby](#apipropertiespropertyidnearby)
  * [/api/users/:userId/lists](#apiusersuseridlists)
  * [/api/users/:userId/lists/:listId](#apiusersuseridlistslistid)
* [Database management system](#Database-management-system)
* [Database schema](#Database-schema)
  * [Table 1](#Table-1)
  * [Table 2](#Table-2)
  * [Table 3](#Table-3)
  * [Table 4](#Table-4)
  * [Table 5](#Table-5)
* [Legacy](#Legacy)

## API

### **`/api/properties/:propertyId/nearby`**

* **GET** data for properties that are nearby current property, including whether each nearby property is associated with a list
  * Route parameter:
    * ID number for the current property
  * Request body: n/a
  * Response:
    * Fields:
      * `stayList`
        * array
          * `stayId`
          * `stayName`
          * `stayPic`
      * `ImgUrls`
        * array
          * `id`
          * `imgUrl`
          * `imgName`
          * `imgDescription`
          * `HouseType`
          * `description`
          * `isSuperHost`
          * `isLiked`
          * `AverageRating`
          * `NumberOfBeds`
          * `NumOfReviews`
          * `PricePerNight`
    * Example:
      ```json
      [
        {
          "stayList": [
            {
              "stayId": 0,
              "stayName": "Florida",
              "stayPic": "https://fec-photos-storage-1.s3-us-west-1.amazonaws.com/1/12.webp"
            },
            // ...
          ],
          "ImgUrls": [
            {
              "id": 0,
              "imgUrl": "https://fec-photos-storage-1.s3-us-west-1.amazonaws.com/2/10.webp",
              "imgName": "Dayna_OReilly",
              "imgDescription": "Legacy",
              "HouseType": "ab",
              "description": "Molestiae sed eum. Labore sequi sit minima praesentium eos rerum ut voluptatibus voluptatum. Ut cupiditate blanditiis mollitia itaque. Rerum accusantium non et occaecati aspernatur voluptate perferendis.",
              "isSuperHost": true,
              "isLiked": false,
              "AverageRating": "2.42",
              "NumberOfBeds": 5,
              "NumOfReviews": 183,
              "PricePerNight": 171
            },
            // ...
          ],
          "_id": "601b952e65f325616b41d429",
          "id": 1,
          "__v": 0
        }
      ]
      ```

### **`/api/users/:userId/lists`**

* **GET** lists of properties
  * Route parameter:
    * User ID number
  * Request body: n/a
  * Response:
    * Fields:
      * `stayList`
        * array
          * `stayId`
          * `stayName`
          * `stayPic`
      * `ImgUrls`
        * array
          * `id`
          * `imgUrl`
          * `imgName`
          * `imgDescription`
          * `HouseType`
          * `description`
          * `isSuperHost`
          * `isLiked`
          * `AverageRating`
          * `NumberOfBeds`
          * `NumOfReviews`
          * `PricePerNight`
    * Example:
      ```json
      [
        {
          "stayList": [
            {
              "stayId": 0,
              "stayName": "Florida",
              "stayPic": "https://fec-photos-storage-1.s3-us-west-1.amazonaws.com/1/12.webp"
            },
            // ...
          ],
          "ImgUrls": [
            {
              "id": 0,
              "imgUrl": "https://fec-photos-storage-1.s3-us-west-1.amazonaws.com/2/10.webp",
              "imgName": "Dayna_OReilly",
              "imgDescription": "Legacy",
              "HouseType": "ab",
              "description": "Molestiae sed eum. Labore sequi sit minima praesentium eos rerum ut voluptatibus voluptatum. Ut cupiditate blanditiis mollitia itaque. Rerum accusantium non et occaecati aspernatur voluptate perferendis.",
              "isSuperHost": true,
              "isLiked": false,
              "AverageRating": "2.42",
              "NumberOfBeds": 5,
              "NumOfReviews": 183,
              "PricePerNight": 171
            },
            // ...
          ],
          "_id": "601b952e65f325616b41d429",
          "id": 1,
          "__v": 0
        }
      ]
      ```
* **POST** new list and associate property with list
  * Route parameter:
    * User ID number
  * Request body:
    ```json
    {
      "propertyId": "<property_id>",
      "name": "<list_name>"
    }
    ```
  * Response:
    * Fields:
      * *TBC*
    * Example:
      * *TBC*

### **`/api/users/:userId/lists/:listId`**

* **POST** new association between property and list
  * Route parameters:
    * User ID number
    * List ID number
  * Request body:
    ```json
    {
      "propertyId": "<property_id>"
    }
    ```
  * Response:
    * Fields:
      * *TBC*
    * Example:
      * *TBC*
* **DELETE** association between property and list
  * Route parameters:
    * User ID number
    * List ID number
  * Request body:
    ```json
    {
      "propertyId": "<property_id>"
    }
    ```
  * Response:
    * Fields:
      * *TBC*
    * Example:
      * *TBC*

## Database management system

* PostgreSQL

## Database schema

### Table 1

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
        <code>INT PRIMARY KEY</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>host_id</code>
      </td>
      <td>
        <code>INT FOREIGN KEY</code>
      </td>
      <td>
        <code>users.id</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>average_rating</code>
      </td>
      <td>
        <code>DECIMAL(1,2)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>review_count</code>
      </td>
      <td>
        <code>INT</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>bed_count</code>
      </td>
      <td>
        <code>INT</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>house_type</code>
      </td>
      <td>
        <code>VARCHAR(10)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>nightly_price</code>
      </td>
      <td>
        <code>DECIMAL(5,2)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>image_name</code>
      </td>
      <td>
        <code>VARCHAR(50)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>image_description</code>
      </td>
      <td>
        <code>VARCHAR(200)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>image_url</code>
      </td>
      <td>
        <code>VARCHAR(200)</code>
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
        <code>INT PRIMARY KEY</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>nearby_property_id</code>
      </td>
      <td>
        <code>INT</code>
      </td>
      <td>
        (<code>properties.id</code>)
      </td>
    </tr>
    <tr>
      <td>
        <code>origin_property_id</code>
      </td>
      <td>
        <code>INT FOREIGN KEY</code>
      </td>
      <td>
        <code>properties.id</code>
      </td>
    </tr>
  </tbody>
</table>

### Table 3

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
        <code>INT PRIMARY KEY</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>property_id</code>
      </td>
      <td>
        <code>INT FOREIGN KEY</code>
      </td>
      <td>
        <code>properties.id</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>list_id</code>
      </td>
      <td>
        <code>INT FOREIGN KEY</code>
      </td>
      <td>
        <code>lists.id</code>
      </td>
    </tr>
  </tbody>
</table>

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
        <code>INT PRIMARY KEY</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>name</code>
      </td>
      <td>
        <code>VARCHAR(50)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>image_url</code>
      </td>
      <td>
        <code>VARCHAR(200)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>user_id</code>
      </td>
      <td>
        <code>INT FOREIGN KEY</code>
      </td>
      <td>
        <code>users.id</code>
      </td>
    </tr>
  </tbody>
</table>

### Table 5

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
        <code>INT PRIMARY KEY</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>name</code>
      </td>
      <td>
        <code>VARCHAR(200)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>email</code>
      </td>
      <td>
        <code>VARCHAR(200)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>password</code>
      </td>
      <td>
        <code>VARCHAR(200)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>is_host</code>
      </td>
      <td>
        <code>TINYINT</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>is_superhost</code>
      </td>
      <td>
        <code>TINYINT</code>
      </td>
      <td>
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

