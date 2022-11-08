import { gql } from "apollo-boost";

export const AUTH_LOGIN = gql`
  query MyQuery {
    allUsers(condition: {}) {
      edges {
        node {
          id
          email
          fullname
        }
      }
    }
  }
`;
export const GET_PROVINCIES = gql`
  query {
    provinces(orderBy: NAME_DESC) {
      nodes {
        rowId
        name
        active
      }
    }
  }
`;
//GET_REQUEST_PAYMENT_SUPCRIPTIONS
export const GET_REQUEST_PAYMENT_SUPCRIPTIONS = gql`
  query MyQuery {
    subscriptionPayments {
      nodes {
        paymentDate
        paymentPhotoUrl
        user {
          firstname
          lastname
          rowId
        }
        subscriptionId
        approved
        paymentType {
          name
          iconUrl
          id
        }
      }
    }
  }
`;
//GET_SUCRIPTION
export const GET_SUPCRIPTIONS = gql`
  query MyQuery($companyId: UUID!) {
    subscriptions(filter: { companyId: { equalTo: $companyId } }) {
      nodes {
        rowId
        company {
          rowId
          name
          phoneNumber
          chatPhoneNumber
          email
          rnc
          branches(filter: { active: { equalTo: true } }) {
            nodes {
              rowId
              name
              addressLatitude
              addressLongitude
              addressAdditionalDescription
            }
          }
        }
        currency {
          rowId
          name
          code
        }
        user {
          rowId
          licensePhotoUrl
          birthday
          companyId
          company {
            rowId
            name
            phoneNumber
            chatPhoneNumber
            email
            rnc
            branches(filter: { active: { equalTo: true } }) {
              nodes {
                rowId
                name
                addressLatitude
                addressLongitude
                addressAdditionalDescription
              }
            }
          }
          email
          phoneNumber
          chatPhoneNumber
          avatarUrl
          firstname
          lastname
          driverLicense
          deviceId
          encryptionKey
          bannedUntil
          receivePromotion
          isAdmin
        }
        name
        nameEn
        description
        descriptionEn
        price
        additionalDriverDiscountPercent
        dayDiscountPercent
        subscriptionWithAdditionalCoverages {
          nodes {
            additionalCoverange {
              rowId
              name
              nameUs
              price
              currency {
                rowId
                name
                code
              }
            }
            percent
          }
        }
        subscriptionWithAirports {
          nodes {
            airport {
              rowId
              deliveryCharge
              currency {
                rowId
                name
                code
              }
              name
              nameUs
            }
            percent
          }
        }
        subscriptionWithProvinces {
          nodes {
            province {
              rowId
              name
            }
            percent
          }
        }
        subscriptionWithRentalItems {
          nodes {
            rentalItem {
              rowId
              name
              nameUs
              price
              currency {
                rowId
                name
                code
              }
            }
            percent
          }
        }
        active
      }
    }
  }
`;
export const GET_MATEINANCES = gql`
  query MyQuery($companyId: UUID!) {
    rentalItems(filter: { companyId: { equalTo: $companyId } }) {
      nodes {
        currency {
          name
          rowId
          code
        }
        name
        nameUs
        price
        rowId
      }
    }
    insurances(filter: { companyId: { equalTo: $companyId } }) {
      nodes {
        rowId
        name
        amount
        nameUs
        description
        descriptionUs
        currency {
          rowId
          name
          code
        }
        active
      }
    }
    branches(filter: { companyId: { equalTo: $companyId } }) {
      nodes {
        addressLongitude
        addressLatitude
        addressAdditionalDescription
        rowId
        name
      }
    }
    airports(filter: { companyId: { equalTo: $companyId } }) {
      nodes {
        rowId
        deliveryCharge
        currency {
          rowId
          name
          code
        }
        name
        nameUs
        active
      }
    }
    provinceInCompanies(filter: { companyId: { equalTo: $companyId } }) {
      nodes {
        provinceId
        province {
          rowId
          name
          active
        }
        currency {
          rowId
          name
          code
        }
        amount
      }
    }
    additionalCoverages(filter: { companyId: { equalTo: $companyId } }) {
      edges {
        node {
          name
          nameUs
          price
          currency {
            rowId
            name
            code
          }
          rowId
        }
      }
    }
    subscriptions(filter: { companyId: { equalTo: $companyId } }) {
      nodes {
        rowId
        company {
          rowId
          name
          phoneNumber
          chatPhoneNumber
          email
          rnc
          branches(filter: { active: { equalTo: true } }) {
            nodes {
              rowId
              name
              addressLatitude
              addressLongitude
              addressAdditionalDescription
            }
          }
        }
        currency {
          rowId
          name
          code
        }
        user {
          rowId
          licensePhotoUrl
          birthday
          companyId
          company {
            rowId
            name
            phoneNumber
            chatPhoneNumber
            email
            rnc
            branches(filter: { active: { equalTo: true } }) {
              nodes {
                rowId
                name
                addressLatitude
                addressLongitude
                addressAdditionalDescription
              }
            }
          }
          email
          phoneNumber
          chatPhoneNumber
          avatarUrl
          firstname
          lastname
          driverLicense
          deviceId
          encryptionKey
          bannedUntil
          receivePromotion
          isAdmin
        }
        name
        nameEn
        description
        descriptionEn
        price
        additionalDriverDiscountPercent
        dayDiscountPercent
        subscriptionWithAdditionalCoverages {
          nodes {
            additionalCoverange {
              rowId
              name
              nameUs
              price
              currency {
                rowId
                name
                code
              }
            }
            percent
          }
        }
        subscriptionWithAirports {
          nodes {
            airport {
              rowId
              deliveryCharge
              currency {
                rowId
                name
                code
              }
              name
              nameUs
            }
            percent
          }
        }
        subscriptionWithProvinces {
          nodes {
            province {
              rowId
              name
            }
            percent
          }
        }
        subscriptionWithRentalItems {
          nodes {
            rentalItem {
              rowId
              name
              nameUs
              price
              currency {
                rowId
                name
                code
              }
            }
            percent
          }
        }
        active
      }
    }
  }
`;
//GET_SUPCRIPTIONS_PAYMENT
export const GET_SUPCRIPTIONS_PAYMENT = gql`
  query ($companyId: UUID!) {
    subscriptionPayments(
      filter: { companyId: { equalTo: $companyId } }
      orderBy: PAYMENT_DATE_DESC
    ) {
      nodes {
        paymentDate
        approved
        paymentPhotoUrl
        paymentType {
          rowId
          name
          references
          iconUrl
        }
        user {
          rowId
          licensePhotoUrl
          birthday
          companyId
          company {
            rowId
            name
            phoneNumber
            chatPhoneNumber
            email
            rnc
            branches(filter: { active: { equalTo: true } }) {
              nodes {
                rowId
                name
                addressLatitude
                addressLongitude
                addressAdditionalDescription
              }
            }
          }
          email
          phoneNumber
          chatPhoneNumber
          avatarUrl
          firstname
          lastname
          driverLicense
          deviceId
          encryptionKey
          bannedUntil
          receivePromotion
          isAdmin
        }
        subscription {
          rowId
          company {
            rowId
            name
            phoneNumber
            chatPhoneNumber
            email
            rnc
            branches(filter: { active: { equalTo: true } }) {
              nodes {
                rowId
                name
                addressLatitude
                addressLongitude
                addressAdditionalDescription
              }
            }
          }
          currency {
            rowId
            name
            code
          }
          user {
            rowId
            licensePhotoUrl
            birthday
            companyId
            company {
              rowId
              name
              phoneNumber
              chatPhoneNumber
              email
              rnc
              branches(filter: { active: { equalTo: true } }) {
                nodes {
                  rowId
                  name
                  addressLatitude
                  addressLongitude
                  addressAdditionalDescription
                }
              }
            }
            email
            phoneNumber
            chatPhoneNumber
            avatarUrl
            firstname
            lastname
            driverLicense
            deviceId
            encryptionKey
            bannedUntil
            receivePromotion
            isAdmin
          }
          name
          nameEn
          description
          descriptionEn
          price
          additionalDriverDiscountPercent
          dayDiscountPercent
          subscriptionWithAdditionalCoverages {
            nodes {
              additionalCoverange {
                rowId
                name
                nameUs
                price
                currency {
                  rowId
                  name
                  code
                }
              }
              percent
            }
          }
          subscriptionWithAirports {
            nodes {
              airport {
                rowId
                deliveryCharge
                currency {
                  rowId
                  name
                  code
                }
                name
                nameUs
              }
              percent
            }
          }
          subscriptionWithProvinces {
            nodes {
              province {
                rowId
                name
              }
              percent
            }
          }
          subscriptionWithRentalItems {
            nodes {
              rentalItem {
                rowId
                name
                nameUs
                price
                currency {
                  rowId
                  name
                  code
                }
              }
              percent
            }
          }
          active
        }
      }
    }
  }
`;
//ALL DATA POST VEHICLES
export const GET_VEHICLE_ALL_DATA = gql`
  query MyQuery($companyId: UUID!) {
    vehicleTypes(
      filter: { companyId: { equalTo: $companyId }, active: { equalTo: true } }
      orderBy: NAME_ASC
    ) {
      nodes {
        rowId
        name
      }
    }
    vehicleBrands(filter: { companyId: { equalTo: $companyId } }) {
      nodes {
        rowId
        name
      }
    }

    vehicleModels(filter: { companyId: { equalTo: $companyId } }) {
      nodes {
        rowId
        name
        vehicleBrand {
          rowId
          name
        }
      }
    }
    vehicleFuelTypes(filter: { companyId: { equalTo: $companyId } }) {
      nodes {
        rowId
        name
      }
    }

    tractionControlTypes(filter: { companyId: { equalTo: $companyId } }) {
      nodes {
        rowId
        name
      }
    }

    vehicleColors(filter: { companyId: { equalTo: $companyId } }) {
      nodes {
        rowId
        name
      }
    }

    amenities(filter: { companyId: { equalTo: $companyId } }) {
      nodes {
        rowId
        name
      }
    }
    vehicleSeatings(filter: { companyId: { equalTo: $companyId } }) {
      nodes {
        rowId
        name
      }
    }
    currencies(filter: { companyId: { equalTo: $companyId } }) {
      nodes {
        rowId
        name
        code
      }
    }
  }
`;
//TIPOS VEHICULOS
export const GET_VEHICLE_TYPES = gql`
  query MyQuery {
    vehicleTypes(orderBy: NAME_ASC) {
      nodes {
        rowId
        name
      }
    }
  }
`;
//TODAS LAS MARCAS VEHICULOS
export const GET_VEHICLE_BRANDS = gql`
  query MyQuery {
    vehicleBrands(orderBy: NAME_ASC) {
      nodes {
        rowId
        name
      }
    }
  }
`;
export const GET_VEHICLE_MODELS = gql`
  query MyQuery {
    vehicleModels(orderBy: NAME_ASC) {
      nodes {
        rowId
        name
        vehicleBrand {
          rowId
          name
        }
      }
    }
  }
`;
//MARCAS - MODELS
export const GET_VEHICLE_BRANDS_AND_MODLES = gql`
  query searchVehicleRequeriments($companyId: UUID!) {
    publishedBrands(
      filter: { companyId: { equalTo: $companyId }, active: { equalTo: true } }
      orderBy: NAME_ASC
    ) {
      nodes {
        rowId
        name
        logoUrl
      }
    }
    publishedModels(
      filter: { companyId: { equalTo: $companyId }, active: { equalTo: true } }
      orderBy: NAME_ASC
    ) {
      nodes {
        rowId
        vehicleBrandId
        name
      }
    }
  }
`;
//GET AIRLINES
export const GET_AIRLINES = gql`
  query MyQuery {
    airlines {
      nodes {
        rowId
        name
      }
    }
  }
`;
//GET AIRTPORTS
export const GET_AIRPORTS = gql`
  query MyQuery {
    airports {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

//COUNT_NOTIFICATIONS
export const COUNT_NOTIFICATIONS = gql`
  query ($userId: UUID!) {
    notifications(
      filter: { userId: { equalTo: $userId }, read: { equalTo: false } }
      orderBy: CREATED_AT_DESC
    ) {
      totalCount
    }
  }
`;
//GET_VEHICLES_FAVORITES
export const GET_VEHICLES_FAVORITES = gql`
  query ($userId: UUID!, $vehicleId: UUID!) {
    userVehicleFavorites(
      filter: {
        userId: { equalTo: $userId }
        vehicleId: { equalTo: $vehicleId }
      }
    ) {
      nodes {
        vehicle {
          rowId
        }
      }
    }
  }
`;
//GET_USER_VEHICLE_FAVORITES
export const GET_USER_VEHICLE_FAVORITES = gql`
  query ($userId: UUID!) {
    userVehicleFavorites(filter: { userId: { equalTo: $userId } }) {
      nodes {
        vehicle {
          rowId
          branchId
          branch {
            company {
              email
              phoneNumber
              chatPhoneNumber
            }
          }
          owner
          isDeluxe
          vehicleWithTypes {
            nodes {
              vehicleType {
                rowId
                name
              }
            }
          }
          vehicleBrand {
            rowId
            name
          }
          vehicleModel {
            rowId
            name
          }
          year
          fuelType {
            rowId
            name
            nameUs
          }
          personQuantity
          tractionControlType {
            rowId
            name
          }
          vehicleSeating {
            rowId
            name
            nameUs
          }
          vehicleColor {
            rowId
            name
            nameUs
          }
          currency {
            rowId
            name
            code
          }
          basePrice
          depositPercent
          vehicleImages(orderBy: SEQUENCE_ASC) {
            nodes {
              imageUrl
              sequence
            }
          }
          vehicleAmenities {
            nodes {
              amenity {
                rowId
                name
                nameUs
              }
            }
          }
          vehicleNotAvailableDates {
            nodes {
              dateFrom
              dateTo
            }
          }
          vehiclePricePerDays {
            nodes {
              fromDate
              toDate
              price
              currency {
                rowId
                name
                code
              }
            }
          }
          active
        }
      }
    }
  }
`;
//GET_NOTIICATIONS
export const GET_NOTIICATIONS = gql`
  query ($userId: UUID!) {
    notifications(
      filter: { userId: { equalTo: $userId }, read: { equalTo: false } }
      orderBy: CREATED_AT_DESC
    ) {
      nodes {
        rowId
        notificationType {
          rowId
          name
        }
        body
        createdAt
      }
    }
  }
`;
//GET_PAYMENT_TYPES
export const GET_PAYMENT_TYPES = gql`
  query ($companyId: UUID!) {
    rentalPaymentTypes(
      filter: { companyId: { equalTo: $companyId }, active: { equalTo: true } }
    ) {
      nodes {
        rowId
        name
        references
      }
    }
  }
`;
//GET_PAYMENTS
export const GET_PAYMENTS = gql`
  query ($rentalId: UUID!) {
    rentalPayments(filter: { rentalId: { equalTo: $rentalId } }) {
      nodes {
        createdAt
        paymentAmount
        paymentPhotoUrl
        paymentReferences
        paymentType {
          rowId
          name
          references
          iconUrl
          active
        }
        user {
          rowId
          birthday
          licensePhotoUrl
          company {
            rowId
            name
            phoneNumber
            chatPhoneNumber
            email
            rnc
            branches(filter: { active: { equalTo: true } }) {
              nodes {
                rowId
                name
                addressLatitude
                addressLongitude
                addressAdditionalDescription
              }
            }
          }
          email
          phoneNumber
          chatPhoneNumber
          avatarUrl
          firstname
          lastname
          driverLicense
          deviceId
          encryptionKey
          bannedUntil
          receivePromotion
          isAdmin
        }
      }
    }
  }
`;
//GET_MY_RENTS
export const GET_MY_RENTS = gql`
  query ($userId: UUID) {
    rentals(
      filter: { requestedBy: { equalTo: $userId } }
      orderBy: RENTAL_NUMBER_DESC
    ) {
      nodes {
        rowId
        rentalNumber
        fromDate
        toDate
        fromTime
        toTime
        branch {
          rowId
          name
        }
        airportByFromAirport {
          rowId
          deliveryCharge
          currency {
            rowId
            name
            code
          }
          name
          nameUs
        }
        airportByToAirport {
          rowId
          deliveryCharge
          currency {
            rowId
            name
            code
          }
          name
          nameUs
        }
        airlineByFromAirline {
          rowId
          name
        }
        airlineByToAirline {
          rowId
          name
        }
        fromFlightNumber
        toFlightNumber
        provinceByFromProvince {
          rowId
          name
        }
        provinceByToProvince {
          rowId
          name
        }
        insurance {
          rowId
          name
          amount
          nameUs
          description
          descriptionUs
          currency {
            rowId
            name
            code
          }
        }
        userByRequestedBy {
          rowId
          birthday
          licensePhotoUrl
          company {
            rowId
            name
            phoneNumber
            chatPhoneNumber
            email
            rnc
            branches(filter: { active: { equalTo: true } }) {
              nodes {
                rowId
                name
                addressLatitude
                addressLongitude
                addressAdditionalDescription
              }
            }
          }
          email
          phoneNumber
          chatPhoneNumber
          avatarUrl
          firstname
          lastname
          driverLicense
          deviceId
          encryptionKey
          bannedUntil
          receivePromotion
          isAdmin
        }
        vehicle {
          rowId
          branchId
          branch {
            company {
              email
              phoneNumber
              chatPhoneNumber
            }
          }
          owner
          isDeluxe
          vehicleWithTypes {
            nodes {
              vehicleType {
                rowId
                name
              }
            }
          }
          vehicleBrand {
            rowId
            name
          }
          vehicleModel {
            rowId
            name
          }
          year
          fuelType {
            rowId
            name
            nameUs
          }
          personQuantity
          tractionControlType {
            rowId
            name
          }
          vehicleSeating {
            rowId
            name
            nameUs
          }
          vehicleColor {
            rowId
            name
            nameUs
          }
          currency {
            rowId
            name
            code
          }
          basePrice
          depositPercent
          vehicleImages(orderBy: SEQUENCE_ASC) {
            nodes {
              imageUrl
              sequence
            }
          }
          vehicleAmenities {
            nodes {
              amenity {
                rowId
                name
                nameUs
              }
            }
          }
          vehicleNotAvailableDates {
            nodes {
              dateFrom
              dateTo
            }
          }
          vehiclePricePerDays {
            nodes {
              fromDate
              toDate
              price
              currency {
                rowId
                name
                code
              }
            }
          }
        }
        rentalStates(orderBy: ADDED_AT_DESC) {
          nodes {
            addedAt
            user {
              rowId
              birthday
              companyId
              company {
                rowId
                name
                phoneNumber
                chatPhoneNumber
                email
                rnc
                branches(filter: { active: { equalTo: true } }) {
                  nodes {
                    rowId
                    name
                    addressLatitude
                    addressLongitude
                    addressAdditionalDescription
                  }
                }
              }
              email
              phoneNumber
              chatPhoneNumber
              avatarUrl
              firstname
              lastname
              driverLicense
              deviceId
              encryptionKey
              bannedUntil
              receivePromotion
              isAdmin
            }
            rentalStateType {
              rowId
              name
              nameUs
            }
          }
        }
        rentalWithAdditionalCoverages {
          nodes {
            additionalCoverage {
              rowId
              name
              nameUs
              price
              currency {
                rowId
                name
                code
              }
            }
          }
        }
        rentalAdditionalDrivers {
          nodes {
            sequence
            fullname
            driverLicense
            price
          }
        }
        rentalWithItems {
          nodes {
            rentalItem {
              rowId
              name
              nameUs
              price
              currency {
                rowId
                name
                code
              }
            }
            quantity
            amount
          }
        }
        fromAirportAmount
        toAirportAmount
        fromProvinceAmount
        toProvinceAmount
        vehicleBasePrice
        vehiclePriceWithOffer
        requestDayQuantity
        dayQuantity
        offerDayQuantity
        insuranceDayQuantity
        rentalAmount
        offerAmount
        additionalDriverAmount
        additionalCoverageAmount
        itemsTotalAmount
        insuranceAmount
        totalAmount
      }
    }
  }
`;
//GET INFO COMPANY
export const GET_INFO_COMPANY = gql`
  query {
    company(rowId: "88116cc5-ba6b-45c8-b1b2-b63ebcc3fc16") {
      rowId
      name
      phoneNumber
      chatPhoneNumber
      email
      rnc
      logoUrl
      email
      mailHost
      mailPort
      mailUser
      mailPassword
      branches(filter: { active: { equalTo: true } }) {
        nodes {
          rowId
          name
          addressLatitude
          addressLongitude
          addressAdditionalDescription
        }
      }
    }
  }
`;
//GET_REQUEST_RENTS
export const GET_REQUEST_RENTS = gql`
  query ($companyId: UUID) {
    rentals(
      filter: { companyId: { equalTo: $companyId } }
      orderBy: RENTAL_NUMBER_DESC
    ) {
      nodes {
        rowId
        rentalNumber
        fromDate
        toDate
        fromTime
        toTime
        branch {
          rowId
          name
        }
        airportByFromAirport {
          rowId
          deliveryCharge
          currency {
            rowId
            name
            code
          }
          name
          nameUs
        }
        airportByToAirport {
          rowId
          deliveryCharge
          currency {
            rowId
            name
            code
          }
          name
          nameUs
        }
        airlineByFromAirline {
          rowId
          name
        }
        airlineByToAirline {
          rowId
          name
        }
        fromFlightNumber
        toFlightNumber
        provinceByFromProvince {
          rowId
          name
        }
        provinceByToProvince {
          rowId
          name
        }
        insurance {
          rowId
          name
          amount
          nameUs
          description
          descriptionUs
          currency {
            rowId
            name
            code
          }
        }
        userByRequestedBy {
          rowId
          birthday
          licensePhotoUrl
          company {
            rowId
            name
            phoneNumber
            chatPhoneNumber
            email
            rnc
            branches(filter: { active: { equalTo: true } }) {
              nodes {
                rowId
                name
                addressLatitude
                addressLongitude
                addressAdditionalDescription
              }
            }
          }
          email
          phoneNumber
          chatPhoneNumber
          avatarUrl
          firstname
          lastname
          driverLicense
          deviceId
          encryptionKey
          bannedUntil
          receivePromotion
          isAdmin
        }
        vehicle {
          rowId
          branchId
          branch {
            company {
              email
              phoneNumber
              chatPhoneNumber
            }
          }
          owner
          isDeluxe
          vehicleWithTypes {
            nodes {
              vehicleType {
                rowId
                name
              }
            }
          }
          vehicleBrand {
            rowId
            name
          }
          vehicleModel {
            rowId
            name
          }
          year
          fuelType {
            rowId
            name
            nameUs
          }
          personQuantity
          tractionControlType {
            rowId
            name
          }
          vehicleSeating {
            rowId
            name
            nameUs
          }
          vehicleColor {
            rowId
            name
            nameUs
          }
          currency {
            rowId
            name
            code
          }
          basePrice
          depositPercent
          vehicleImages(orderBy: SEQUENCE_ASC) {
            nodes {
              imageUrl
              sequence
            }
          }
          vehicleAmenities {
            nodes {
              amenity {
                rowId
                name
                nameUs
              }
            }
          }
          vehicleNotAvailableDates {
            nodes {
              dateFrom
              dateTo
            }
          }
          vehiclePricePerDays {
            nodes {
              fromDate
              toDate
              price
              currency {
                rowId
                name
                code
              }
            }
          }
        }
        rentalStates(orderBy: ADDED_AT_DESC) {
          nodes {
            addedAt
            user {
              rowId
              birthday
              companyId
              company {
                rowId
                name
                phoneNumber
                chatPhoneNumber
                email
                rnc
                branches(filter: { active: { equalTo: true } }) {
                  nodes {
                    rowId
                    name
                    addressLatitude
                    addressLongitude
                    addressAdditionalDescription
                  }
                }
              }
              email
              phoneNumber
              chatPhoneNumber
              avatarUrl
              firstname
              lastname
              driverLicense
              deviceId
              encryptionKey
              bannedUntil
              receivePromotion
              isAdmin
            }
            rentalStateType {
              rowId
              name
              nameUs
            }
          }
        }
        rentalWithAdditionalCoverages {
          nodes {
            additionalCoverage {
              rowId
              name
              nameUs
              price
              currency {
                rowId
                name
                code
              }
            }
          }
        }
        rentalAdditionalDrivers {
          nodes {
            sequence
            fullname
            driverLicense
            price
          }
        }
        rentalWithItems {
          nodes {
            rentalItem {
              rowId
              name
              nameUs
              price
              currency {
                rowId
                name
                code
              }
            }
            quantity
            amount
          }
        }
        fromAirportAmount
        toAirportAmount
        fromProvinceAmount
        toProvinceAmount
        vehicleBasePrice
        vehiclePriceWithOffer
        requestDayQuantity
        dayQuantity
        offerDayQuantity
        insuranceDayQuantity
        rentalAmount
        offerAmount
        additionalDriverAmount
        additionalCoverageAmount
        itemsTotalAmount
        insuranceAmount
        totalAmount
      }
    }
  }
`;
//GET REQUERIMENTS
export const GET_REQUERIMENT_FOR_RENT = gql`
  query requerimentForRental(
    $companyId: UUID!
    $userId: UUID!
    $upToDate: Date!
  ) {
    settings(
      filter: { companyId: { equalTo: $companyId } }
      orderBy: EFFECTIVE_DATE_DESC
      first: 1
    ) {
      nodes {
        effectiveDate
        appBuildNumber
        inMainteniceMode
        minimunRentalDays
        minimunRentalCancelFreeHours
        additionalDriverPrice
        currency {
          rowId
          name
          code
        }
      }
    }
    insurances(
      filter: { companyId: { equalTo: $companyId }, active: { equalTo: true } }
    ) {
      nodes {
        rowId
        name
        amount
        nameUs
        description
        descriptionUs
        currency {
          rowId
          name
          code
        }
      }
    }
    airports(
      filter: { companyId: { equalTo: $companyId }, active: { equalTo: true } }
    ) {
      nodes {
        rowId
        deliveryCharge
        name
        nameUs
        currency {
          rowId
          name
          code
        }
      }
    }
    airlines(
      filter: { companyId: { equalTo: $companyId }, active: { equalTo: true } }
      orderBy: NAME_ASC
    ) {
      nodes {
        rowId
        name
      }
    }
    rentalItems(
      filter: { companyId: { equalTo: $companyId }, active: { equalTo: true } }
      orderBy: NAME_ASC
    ) {
      nodes {
        rowId
        name
        nameUs
        price
        currency {
          rowId
          name
          code
        }
      }
    }
    provinceInCompanies(filter: { companyId: { equalTo: $companyId } }) {
      nodes {
        province {
          rowId
          name
        }
        amount
        currency {
          rowId
          name
          code
        }
      }
    }
    branches(
      filter: { companyId: { equalTo: $companyId }, active: { equalTo: true } }
    ) {
      nodes {
        rowId
        name
        addressLatitude
        addressLongitude
        addressAdditionalDescription
      }
    }
    additionalCoverages(
      filter: { companyId: { equalTo: $companyId }, active: { equalTo: true } }
    ) {
      nodes {
        rowId
        name
        nameUs
        price
        currency {
          rowId
          name
          code
        }
      }
    }
    userWithSubscriptions(
      filter: {
        userId: { equalTo: $userId }
        upToDate: { greaterThanOrEqualTo: $upToDate }
        active: { equalTo: true }
      }
      orderBy: UP_TO_DATE_DESC
    ) {
      nodes {
        subscription {
          rowId
          company {
            rowId
            name
            phoneNumber
            chatPhoneNumber
            email
            rnc
            branches(filter: { active: { equalTo: true } }) {
              nodes {
                rowId
                name
                addressLatitude
                addressLongitude
                addressAdditionalDescription
              }
            }
          }
          currency {
            rowId
            name
            code
          }
          user {
            rowId
            licensePhotoUrl
            birthday
            companyId
            company {
              rowId
              name
              phoneNumber
              chatPhoneNumber
              email
              rnc
              branches(filter: { active: { equalTo: true } }) {
                nodes {
                  rowId
                  name
                  addressLatitude
                  addressLongitude
                  addressAdditionalDescription
                }
              }
            }
            email
            phoneNumber
            chatPhoneNumber
            avatarUrl
            firstname
            lastname
            driverLicense
            deviceId
            encryptionKey
            bannedUntil
            receivePromotion
            isAdmin
          }
          name
          nameEn
          description
          descriptionEn
          price
          additionalDriverDiscountPercent
          dayDiscountPercent
          subscriptionWithAdditionalCoverages {
            nodes {
              additionalCoverange {
                rowId
                name
                nameUs
                price
                currency {
                  rowId
                  name
                  code
                }
              }
              percent
            }
          }
          subscriptionWithAirports {
            nodes {
              airport {
                rowId
                deliveryCharge
                currency {
                  rowId
                  name
                  code
                }
                name
                nameUs
              }
              percent
            }
          }
          subscriptionWithProvinces {
            nodes {
              province {
                rowId
                name
              }
              percent
            }
          }
          subscriptionWithRentalItems {
            nodes {
              rentalItem {
                rowId
                name
                nameUs
                price
                currency {
                  rowId
                  name
                  code
                }
              }
              percent
            }
          }
          active
        }
      }
    }
  }
`;
export const GET_VEHICLES = gql`
  query ($branchIds: [UUID!]!) {
    vehicles(filter: { branchId: { in: $branchIds } }) {
      nodes {
        rowId
        branchId
        branch {
          company {
            email
            phoneNumber
            chatPhoneNumber
          }
        }
        owner
        isDeluxe
        vehicleWithTypes {
          nodes {
            vehicleType {
              rowId
              name
            }
          }
        }
        vehicleBrand {
          rowId
          name
        }
        vehicleModel {
          rowId
          name
        }
        year
        fuelType {
          rowId
          name
          nameUs
        }
        personQuantity
        tractionControlType {
          rowId
          name
        }
        vehicleSeating {
          rowId
          name
          nameUs
        }
        vehicleColor {
          rowId
          name
          nameUs
        }
        currency {
          rowId
          name
          code
        }
        basePrice
        depositPercent
        vehicleImages(orderBy: SEQUENCE_ASC) {
          nodes {
            imageUrl
            sequence
          }
        }
        vehicleAmenities {
          nodes {
            amenity {
              rowId
              name
              nameUs
            }
          }
        }
        vehicleNotAvailableDates {
          nodes {
            dateFrom
            dateTo
          }
        }
        vehiclePricePerDays {
          nodes {
            fromDate
            toDate
            price
            currency {
              rowId
              name
              code
            }
          }
        }
        active
      }
    }
  }
`;

export const GET_VEHICLES_FIRST = gql`
  query ($branchIds: [UUID!]!) {
    vehicles(filter: { branchId: { in: $branchIds } }) {
      nodes {
        rowId
        branchId
        branch {
          company {
            email
            phoneNumber
            chatPhoneNumber
          }
        }
        owner
        isDeluxe
        vehicleWithTypes {
          nodes {
            vehicleType {
              rowId
              name
            }
          }
        }
        vehicleBrand {
          rowId
          name
        }
        vehicleModel {
          rowId
          name
        }
        year
        fuelType {
          rowId
          name
          nameUs
        }
        personQuantity
        tractionControlType {
          rowId
          name
        }
        vehicleSeating {
          rowId
          name
          nameUs
        }
        vehicleColor {
          rowId
          name
          nameUs
        }
        currency {
          rowId
          name
          code
        }
        basePrice
        depositPercent
        vehicleImages(orderBy: SEQUENCE_ASC) {
          nodes {
            imageUrl
            sequence
          }
        }
        vehicleAmenities {
          nodes {
            amenity {
              rowId
              name
              nameUs
            }
          }
        }
        vehicleNotAvailableDates {
          nodes {
            dateFrom
            dateTo
          }
        }
        vehiclePricePerDays {
          nodes {
            fromDate
            toDate
            price
            currency {
              rowId
              name
              code
            }
          }
        }
        active
      }
    }
  }
`;
export const GET_REQUERIMENT_VEHICLES = gql`
  query publishVehicleRequeriments($companyId: UUID!) {
    vehicleTypes(
      filter: { companyId: { equalTo: $companyId }, active: { equalTo: true } }
      orderBy: NAME_ASC
    ) {
      nodes {
        rowId
        name
      }
    }
    vehicleBrands(
      filter: { companyId: { equalTo: $companyId }, active: { equalTo: true } }
      orderBy: NAME_ASC
    ) {
      nodes {
        rowId
        name
      }
    }
    vehicleModels(
      filter: { companyId: { equalTo: $companyId }, active: { equalTo: true } }
      orderBy: NAME_ASC
    ) {
      nodes {
        rowId
        vehicleBrandId
        name
      }
    }
    vehicleFuelTypes(
      filter: { companyId: { equalTo: $companyId }, active: { equalTo: true } }
      orderBy: NAME_ASC
    ) {
      nodes {
        rowId
        name
      }
    }
    vehicleSeatings(
      filter: { companyId: { equalTo: $companyId }, active: { equalTo: true } }
      orderBy: NAME_ASC
    ) {
      nodes {
        rowId
        name
      }
    }
    vehicleColors(
      filter: { companyId: { equalTo: $companyId }, active: { equalTo: true } }
      orderBy: NAME_ASC
    ) {
      nodes {
        rowId
        name
      }
    }
    currencies(
      filter: { companyId: { equalTo: $companyId }, active: { equalTo: true } }
      orderBy: NAME_ASC
    ) {
      nodes {
        rowId
        name
        code
      }
    }
    tractionControlTypes(
      filter: { companyId: { equalTo: $companyId }, active: { equalTo: true } }
      orderBy: NAME_ASC
    ) {
      nodes {
        rowId
        name
      }
    }
    amenities(
      filter: { companyId: { equalTo: $companyId }, active: { equalTo: true } }
      orderBy: NAME_ASC
    ) {
      nodes {
        rowId
        name
      }
    }
  }
`;
export const GET_VEHICLES_POPULARS = gql`
  query ($branchIds: [UUID!]!) {
    vehicles(filter: { branchId: { in: $branchIds } }) {
      nodes {
        rowId
        branchId
        branch {
          company {
            email
            phoneNumber
            chatPhoneNumber
          }
        }
        owner
        isDeluxe
        vehicleWithTypes {
          nodes {
            vehicleType {
              rowId
              name
            }
          }
        }
        vehicleBrand {
          rowId
          name
        }
        vehicleModel {
          rowId
          name
        }
        year
        fuelType {
          rowId
          name
          nameUs
        }
        personQuantity
        tractionControlType {
          rowId
          name
        }
        vehicleSeating {
          rowId
          name
          nameUs
        }
        vehicleColor {
          rowId
          name
          nameUs
        }
        currency {
          rowId
          name
          code
        }
        basePrice
        depositPercent
        vehicleImages(orderBy: SEQUENCE_ASC) {
          nodes {
            imageUrl
            sequence
          }
        }
        vehicleAmenities {
          nodes {
            amenity {
              rowId
              name
              nameUs
            }
          }
        }
        vehicleNotAvailableDates {
          nodes {
            dateFrom
            dateTo
          }
        }
        vehiclePricePerDays {
          nodes {
            fromDate
            toDate
            price
            currency {
              rowId
              name
              code
            }
          }
        }
        active
      }
    }
  }
`;

export const GET_VEHICLES_BY_ID = gql`
  query MyQuery($vehicle: UUID!) {
    vehicles(condition: { rowId: $vehicle }) {
      edges {
        node {
          year
          isDeluxe
          vehicleBrand {
            name
            rowId
          }
          vehicleModel {
            name
            rowId
          }
          vehicleWithTypes {
            nodes {
              vehicleType {
                rowId
                name
              }
            }
          }
          vehicleColor {
            name
            rowId
          }
          fuelType {
            rowId
            name
          }
          personQuantity
          vehicleImages {
            nodes {
              id
              imageUrl
              sequence
            }
          }
          basePrice
          personQuantity
          vehicleAmenities {
            nodes {
              amenity {
                name
                nameUs
                rowId
              }
            }
            totalCount
          }
          vehicleSeating {
            id
          }
          tractionControlType {
            name
            rowId
          }
        }
      }
    }
  }
`;

export const GET_VEHICLES_BY_BRANCH_AND_MODEL = gql`
  query (
    $branchIds: [UUID!]!
    $vehicleBrandId: UUID!
    $vehicleModelId: UUID!
    $yearGreaterThan: Int!
    $yearLessThan: Int!
  ) {
    vehicles(
      filter: {
        active: { equalTo: true }
        branchId: { in: $branchIds }
        vehicleBrandId: { equalTo: $vehicleBrandId }
        vehicleModelId: { equalTo: $vehicleModelId }
        year: {
          greaterThanOrEqualTo: $yearGreaterThan
          lessThanOrEqualTo: $yearLessThan
        }
      }
    ) {
      nodes {
        rowId
        branchId
        branch {
          company {
            email
            phoneNumber
            chatPhoneNumber
          }
        }
        owner
        vehicleWithTypes {
          nodes {
            vehicleType {
              rowId
              name
            }
          }
        }
        vehicleBrand {
          rowId
          name
        }
        vehicleModel {
          rowId
          name
        }
        year
        fuelType {
          rowId
          name
        }
        personQuantity
        tractionControlType {
          rowId
          name
        }
        vehicleSeating {
          rowId
          name
        }
        vehicleColor {
          rowId
          name
        }
        currency {
          rowId
          name
          code
        }
        basePrice

        vehicleImages(orderBy: SEQUENCE_ASC, first: 5) {
          nodes {
            imageUrl
            sequence
          }
        }
        vehicleAmenities {
          nodes {
            amenity {
              name
              nameUs
              rowId
            }
          }
          totalCount
        }
        vehicleNotAvailableDates {
          nodes {
            dateFrom
            dateTo
          }
        }
      }
    }
  }
`;
export const GET_VEHICLES_BY_BRANCH = gql`
  query (
    $branchIds: [UUID!]!
    $vehicleBrandId: UUID!
    $yearGreaterThan: Int!
    $yearLessThan: Int!
  ) {
    vehicles(
      filter: {
        active: { equalTo: true }
        branchId: { in: $branchIds }
        vehicleBrandId: { equalTo: $vehicleBrandId }
        year: {
          greaterThanOrEqualTo: $yearGreaterThan
          lessThanOrEqualTo: $yearLessThan
        }
      }
    ) {
      nodes {
        rowId
        isDeluxe
        branchId
        branch {
          company {
            email
            phoneNumber
            chatPhoneNumber
          }
        }
        owner
        vehicleWithTypes {
          nodes {
            vehicleType {
              rowId
              name
            }
          }
        }
        vehicleBrand {
          rowId
          name
        }
        vehicleModel {
          rowId
          name
        }
        year
        fuelType {
          rowId
          name
        }
        personQuantity
        tractionControlType {
          rowId
          name
        }
        vehicleSeating {
          rowId
          name
        }
        vehicleColor {
          rowId
          name
        }
        currency {
          rowId
          name
          code
        }
        basePrice

        vehicleImages(orderBy: SEQUENCE_ASC, first: 5) {
          nodes {
            imageUrl
            sequence
          }
        }
        vehicleAmenities {
          nodes {
            amenity {
              name
              nameUs
              rowId
            }
          }
          totalCount
        }
        vehicleNotAvailableDates {
          nodes {
            dateFrom
            dateTo
          }
        }
      }
    }
  }
`;
//tipos de vehiculos
export const GET_VEHICLES_TYPES = gql`
  query MyQuery {
    vehicleBrands(orderBy: NAME_ASC) {
      nodes {
        name
      }
    }
  }
`;
