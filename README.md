# HouseHub

> A RESTful API that will display home rental information.

## Related Projects

  - https://github.com/Sonic-Design/reviews
  - https://github.com/Sonic-Design/checkout-calendar
  - https://github.com/Sonic-Design/photoGallery

## Table of Contents

1. [API](#API)
2. [Database management system](#Database-management-system)
3. [Database schema](#Database-schema)
4. [Legacy](#Legacy)

## API

* **`/api/listings`**
  * `/api/listings/<listing_id>`
    * GET data for current listing on page load
      * Route parameter:
        * ID number for the current listing
* **`/api/relatedListings`**
  * `/api/relatedListings/<listing_id>`
    * GET data for listings that are related to current listing, including whether each related listing is associated with a list
      * Route parameter:
        * ID number for the current listing
* **`/api/lists`**
  * `/api/lists`
    * GET lists and, where applicable, the list categories under which they are grouped
  * `/api/lists?type=list`
    * POST new list and set listing as first associated listing
      * Query string parameter:
        * type=list
      * `application/JSON` body:
        ```json
        {
          "listingId": "<listing_id>",
          "name": "<list_name>"
        }
        ```
  * **`/api/lists?type=category`**
    * `/api/lists?type=category`
      * POST new list category and associate list
        * Query string parameter:
          * `type=category`
        * `application/JSON` body:
          ```json
          {
            "listId": "<list_id>",
            "name": "<list_category_name>"
          }
          ```
    * `/api/lists?type=category&action=add&listId=<list_id>`
      * PATCH list to be associated with list category
        * Query string parameters:
          * `type=category`
          * `action=add`
          * `listId=<list_id>`
        * `application/JSON` body:
          ```json
          {
            "name": "<list_category_name>"
          }
          ```
    * **`/api/lists?type=category&action=remove`**
      * `/api/lists?type=category&action=remove&listId=<list_id>`
        * PATCH list to be unassociated from list category
          * Query string parameters:
            * `type=category`
            * `action=remove`
            * `listId=<list_id>`
          * `application/JSON` body:
          ```json
          {
            "name": "<list_category_name>"
          }
          ```
      * `/api/lists?type=category&action=remove&listId=all`
        * PATCH all lists to be unassociated from list category
          * Query string parameters:
            * `type=category`
            * `action=remove`
            * `listId=all`
          * `application/JSON` body:
          ```json
          {
            "name": "<list_category_name>"
          }
          ```
    * `/api/lists?type=category&action=rename&orig=<existing_list_category_name>`
      * PATCH new name for list category
        * Query string parameters:
          * `type=category`
          * `action=rename`
          * `orig=<existing_list_category_name>`
        * `application/JSON` body:
          ```json
          {
            "name": "<new_list_category_name>"
          }
          ```
  * **`/api/lists/<list_id>?type=listing`**
    * `/api/lists/<list_id>?type=listing&action=add&listingId=<listing_id>`
      * PATCH listing as an associated listing to list
        * Route parameter:
          * ID number for the list
        * Query string parameters:
          * `type=listing`
          * `action=add`
          * `listingId=<listing_id>`
    * `/api/lists/<list_id>?type=listing&action=remove&listingId=<listing_id>`
      * PATCH listing as an unassociated listing to list
        * Route parameter:
          * ID number for the list
        * Query string parameters:
          * `type=listing`
          * `action=remove`
          * `listingId=<listing_id>`

## Database management system

* PostgreSQL

## Database schema

<table>
  <thead style="text-align: center">
    <tr>
      <td colspan="3">
        <strong><code>listings</code></strong>
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
    <tr>
      <td>
        <code>host_id</code>
      </td>
      <td>
        <code>INT FOREIGN KEY</code>
      </td>
      <td>
        <code>hosts.id</code>
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
        <code>nightly_price</code>
      </td>
      <td>
        <code>DECIMAL(5,2)</code>
      </td>
      <td>
      </td>
    </tr>
  </tbody>
</table>

<table>
  <thead style="text-align: center">
    <tr>
      <td colspan="3">
        <strong><code>related_listings</code></strong>
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
        <code>related_listing_id</code>
      </td>
      <td>
        <code>INT</code>
      </td>
      <td>
        (<code>listings.id</code>)
      </td>
    </tr>
    <tr>
      <td>
        <code>origin_listing_id</code>
      </td>
      <td>
        <code>INT FOREIGN KEY</code>
      </td>
      <td>
        <code>listings.id</code>
      </td>
    </tr>
  </tbody>
</table>

<table>
  <thead style="text-align: center">
    <tr>
      <td colspan="3">
        <strong><code>images</code></strong>
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
        <code>description</code>
      </td>
      <td>
        <code>VARCHAR(200)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>url</code>
      </td>
      <td>
        <code>VARCHAR(200)</code>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td>
        <code>listing_id</code>
      </td>
      <td>
        <code>INT FOREIGN KEY</code>
      </td>
      <td>
        <code>listings.id</code>
      </td>
    </tr>
  </tbody>
</table>

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
        <code>first_associated_listing</code>
      </td>
      <td>
        <code>INT FOREIGN KEY</code>
      </td>
      <td>
        <code>listings.id</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>list_category_name</code>
      </td>
      <td>
        <code>VARCHAR(50)</code>
      </td>
      <td>
      </td>
    </tr>
  </tbody>
</table>

<table>
  <thead style="text-align: center">
    <tr>
      <td colspan="3">
        <strong><code>hosts</code></strong>
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
        <code>superhost</code>
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

