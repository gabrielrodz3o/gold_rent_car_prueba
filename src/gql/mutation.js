import gql from "graphql-tag";
//MAKE_SUPCRIPTION_PAYMENTS

export const MAKE_SUPCRIPTION_PAYMENTS = gql`
  mutation (
    $userId: String!
    $subscriptionId: String!
    $rentalPaymentTypeId: String!
    $paymentPhotoUrl: String!
  ) {
    doSubscriptionPayment(
      input: {
        userId: $userId
        subscriptionId: $subscriptionId
        rentalPaymentTypeId: $rentalPaymentTypeId
        paymentPhotoUrl: $paymentPhotoUrl
      }
    ) {
      user {
        rowId
        birthday
        licensePhotoUrl
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
    }
  }
`;
//CREATE_SUCRIPTIONS
export const CREATE_SUPSCRIPTION = gql`
  mutation (
    $subscriptionId: String
    $companyId: String!
    $currencyId: String!
    $userId: String!
    $name: String!
    $nameEn: String!
    $description: String!
    $descriptionEn: String!
    $price: BigFloat!
    $additionalDriverDiscountPercent: BigFloat!
    $dayDiscountPercent: BigFloat!
    $subscriptionWithAdditionalCoverages: JSON!
    $subscriptionWithAirports: JSON!
    $subscriptionWithProvinces: JSON!
    $subscriptionWithRentalItems: JSON!
  ) {
    addSubscription(
      input: {
        subscriptionId: $subscriptionId
        companyId: $companyId
        currencyId: $currencyId
        userId: $userId
        name: $name
        nameEn: $nameEn
        description: $description
        descriptionEn: $descriptionEn
        price: $price
        additionalDriverDiscountPercent: $additionalDriverDiscountPercent
        dayDiscountPercent: $dayDiscountPercent
        subscriptionWithAdditionalCoverages: $subscriptionWithAdditionalCoverages
        subscriptionWithAirports: $subscriptionWithAirports
        subscriptionWithProvinces: $subscriptionWithProvinces
        subscriptionWithRentalItems: $subscriptionWithRentalItems
      }
    ) {
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
`;
//DELETE_SUPSCRIPTION
export const DELETE_SUPSCRIPTION = gql`
  mutation ($subscriptionId: UUID!, $isActive: Boolean!) {
    updateSubscription(
      input: { rowId: $subscriptionId, patch: { active: $isActive } }
    ) {
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
        description
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
//CREATE_ACESORIES
export const CREATE_ACESORIES = gql`
  mutation (
    $companyId: UUID!
    $currencyId: UUID!
    $name: String!
    $nameUs: String!
    $price: BigFloat!
  ) {
    createRentalItem(
      input: {
        rentalItem: {
          companyId: $companyId
          name: $name
          price: $price
          currencyId: $currencyId
          nameUs: $nameUs
        }
      }
    ) {
      rentalItem {
        name
        nameUs
        price
        rowId
        currency {
          code
          rowId
          name
        }
      }
    }
  }
`;
//UPDATE_ACESORIES
export const UPDATE_ACESORIES = gql`
  mutation (
    $rentalItemId: UUID!
    $currencyId: UUID!
    $name: String!
    $nameUs: String!
    $price: BigFloat!
  ) {
    updateRentalItem(
      input: {
        patch: {
          currencyId: $currencyId
          name: $name
          nameUs: $nameUs
          price: $price
        }
        rowId: $rentalItemId
      }
    ) {
      rentalItem {
        nameUs
        name
        price
        rowId
        currency {
          name
          rowId
          code
        }
      }
    }
  }
`;
//DELETE_ACESORIES
export const DELETE_ACESORIES = gql`
  mutation ($rentalItemId: UUID!) {
    deleteRentalItem(input: { rowId: $rentalItemId }) {
      rentalItem {
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
  }
`;
//CREATE INSURANCES
export const CREATE_INSURANCES = gql`
  mutation (
    $name: String!
    $amount: BigFloat!
    $nameUs: String!
    $description: String!
    $descriptionUs: String!
    $currencyId: UUID!
    $companyId: UUID!
  ) {
    createInsurance(
      input: {
        insurance: {
          companyId: $companyId
          name: $name
          amount: $amount
          nameUs: $nameUs
          description: $description
          descriptionUs: $descriptionUs
          currencyId: $currencyId
          active: true
        }
      }
    ) {
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
        active
      }
    }
  }
`;
//UPDATE INSURANCES
export const UPDATE_INSURANCES = gql`
  mutation (
    $insuranceId: UUID!
    $name: String!
    $amount: BigFloat!
    $nameUs: String!
    $description: String!
    $descriptionUs: String!
    $currencyId: UUID!
  ) {
    updateInsurance(
      input: {
        rowId: $insuranceId
        patch: {
          name: $name
          amount: $amount
          currencyId: $currencyId
          description: $description
          nameUs: $nameUs
          descriptionUs: $descriptionUs
        }
      }
    ) {
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
        active
      }
    }
  }
`;
//DELETE INSURANCES
export const DELETE_INSURANCES = gql`
  mutation ($insuranceId: UUID!) {
    deleteInsurance(input: { rowId: $insuranceId }) {
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
        active
      }
    }
  }
`;

// ,
// ,
//
export const CREATE_PROVINCIES = gql`
  mutation (
    $provinceId: UUID!
    $companyId: UUID!
    $amount: BigFloat!
    $currencyId: UUID!
  ) {
    createProvinceInCompany(
      input: {
        provinceInCompany: {
          provinceId: $provinceId
          companyId: $companyId
          currencyId: $currencyId
          amount: $amount
          active: true
        }
      }
    ) {
      provinceInCompany {
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
  }
`;
export const UPDATE_PROVINCIES = gql`
  mutation (
    $provinceId: UUID!
    $companyId: UUID!
    $currencyId: UUID!
    $amount: BigFloat!
  ) {
    updateProvinceInCompany(
      input: {
        provinceId: $provinceId
        companyId: $companyId
        patch: { amount: $amount, currencyId: $currencyId }
      }
    ) {
      provinceInCompany {
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
  }
`;
//DELETE_PROVINCIES
export const DELETE_PROVINCIES = gql`
  mutation ($provinceId: UUID!, $companyId: UUID!) {
    deleteProvinceInCompany(
      input: { provinceId: $provinceId, companyId: $companyId }
    ) {
      provinceInCompany {
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
  }
`;
//UPDATE AIRPORTS
export const UPDATE_AIRPORTS = gql`
  mutation (
    $airportId: UUID!
    $currencyId: UUID!
    $deliveryCharge: BigFloat!
    $name: String!
    $nameUs: String!
  ) {
    updateAirport(
      input: {
        rowId: $airportId
        patch: {
          deliveryCharge: $deliveryCharge
          name: $name
          nameUs: $nameUs
          currencyId: $currencyId
        }
      }
    ) {
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
        active
      }
    }
  }
`;

//DELETE AIRPORTS
export const DELETE_AIRPORTS = gql`
  mutation ($airportId: UUID!) {
    deleteAirport(input: { rowId: $airportId }) {
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
        active
      }
    }
  }
`;

//CREATE AIRPORTS
export const CREATE_AIRPORTS = gql`
  mutation (
    $companyId: UUID!
    $currencyId: UUID!
    $deliveryCharge: BigFloat!
    $name: String!
    $nameUs: String!
  ) {
    createAirport(
      input: {
        airport: {
          companyId: $companyId
          deliveryCharge: $deliveryCharge
          currencyId: $currencyId
          name: $name
          nameUs: $nameUs
          active: true
        }
      }
    ) {
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
        active
      }
    }
  }
`;
export const REGISTER_USER = gql`
  mutation (
    $companyId: String
    $email: String!
    $firstname: String!
    $lastname: String!
    $phoneNumber: String!
    $chatPhoneNumber: String!
    $driverLicense: String!
    $deviceId: String
    $receivePromotion: Boolean!
    $birthday: Date!
  ) {
    register(
      input: {
        companyId: $companyId
        email: $email
        driverLicense: $driverLicense
        firstname: $firstname
        lastname: $lastname
        phoneNumber: $phoneNumber
        chatPhoneNumber: $chatPhoneNumber
        deviceId: $deviceId
        receivePromotion: $receivePromotion
        birthday: $birthday
      }
    ) {
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
    }
  }
`;
//CREATE BRANCH
export const CREATE_BRANCH = gql`
  mutation (
    $addressLongitude: BigFloat!
    $addressLatitude: BigFloat!
    $companyId: UUID!
    $name: String!
    $addressAdditionalDescription: String!
  ) {
    createBranch(
      input: {
        branch: {
          companyId: $companyId
          name: $name
          addressLongitude: $addressLongitude
          addressLatitude: $addressLatitude
          addressAdditionalDescription: $addressAdditionalDescription
        }
      }
    ) {
      branch {
        addressAdditionalDescription
        addressLatitude
        addressLongitude
        rowId
        name
      }
    }
  }
`;
//UPDATE BRANCh
export const UPDATE_BRANCH = gql`
  mutation (
    $branchId: UUID!
    $addressAdditionalDescription: String!
    $addressLatitude: BigFloat!
    $addressLongitude: BigFloat!
    $name: String!
  ) {
    updateBranch(
      input: {
        rowId: $branchId
        patch: {
          addressLatitude: $addressLatitude
          addressLongitude: $addressLongitude
          name: $name
          addressAdditionalDescription: $addressAdditionalDescription
        }
      }
    ) {
      branch {
        addressLatitude
        addressLongitude
        addressAdditionalDescription
        name
        rowId
      }
    }
  }
`;
//DELETE BRACH
export const DELETE_BRANCH = gql`
  mutation ($branchId: UUID!) {
    deleteBranch(input: { rowId: $branchId }) {
      branch {
        rowId
        name
        addressLongitude
        addressLatitude
        addressAdditionalDescription
      }
    }
  }
`;
export const CREATE_ADITIONAL_INSURANCES = gql`
  mutation (
    $companyId: UUID!
    $currencyId: UUID!
    $name: String!
    $nameUs: String!
    $price: BigFloat!
  ) {
    createAdditionalCoverage(
      input: {
        additionalCoverage: {
          companyId: $companyId
          name: $name
          nameUs: $nameUs
          price: $price
          currencyId: $currencyId
        }
      }
    ) {
      additionalCoverage {
        rowId
        price
        name
        nameUs
        currency {
          rowId
          name
          code
        }
      }
    }
  }
`;

export const UPDATE_ADITIONAL_INSURANCES = gql`
  mutation (
    $additionalCoverageId: UUID!
    $name: String!
    $nameUs: String!
    $price: BigFloat!
    $currencyId: UUID!
  ) {
    updateAdditionalCoverage(
      input: {
        patch: {
          name: $name
          nameUs: $nameUs
          price: $price
          currencyId: $currencyId
        }
        rowId: $additionalCoverageId
      }
    ) {
      additionalCoverage {
        name
        nameUs
        price
        rowId
        currency {
          code
          name
          rowId
        }
      }
    }
  }
`;

export const DELETE_ADITIONAL_INSURANCES = gql`
  mutation ($additionalCoverageId: UUID!) {
    deleteAdditionalCoverage(input: { rowId: $additionalCoverageId }) {
      additionalCoverage {
        currency {
          code
          name
          rowId
        }
        name
        nameUs
        price
        rowId
      }
    }
  }
`;

//SEND EMAIL

export const SEND_EMAIL = gql`
  mutation (
    $from: String!
    $to: String!
    $subject: String!
    $text: String!
    $html: String!
  ) {
    sendEmail(from: $from, to: $to, subject: $subject, text: $text, html: $html)
  }
`;

//AUTHENTICATION
export const AUTH_USER = gql`
  mutation ($email: String!, $companyId: String) {
    signInByCompany(input: { email: $email, companyId: $companyId }) {
      user {
        rowId
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
        birthday
        driverLicense
        deviceId
        encryptionKey
        bannedUntil
        receivePromotion
        isAdmin
        licensePhotoUrl
      }
    }
  }
`;
//POST RESERVE
export const RESERVE_VEHICLE = gql`
  mutation (
    $companyId: String!
    $vehicleId: String!
    $branchId: String
    $requestedBy: String!
    $fromDate: Date!
    $toDate: Date!
    $fromTime: Time!
    $toTime: Time!
    $fromProvince: String
    $toProvince: String
    $fromAirport: String
    $toAirport: String
    $fromAirline: String
    $toAirline: String
    $fromFlightNumber: String
    $toFlightNumber: String
    $insuranceId: String
    $subscriptionId: String
    $rentalItems: [String!]!
    $additionalCoverages: [String!]!
    $additionalDrivers: JSON!
  ) {
    requestARental(
      input: {
        companyId: $companyId
        vehicleId: $vehicleId
        branchId: $branchId
        requestedBy: $requestedBy
        fromDate: $fromDate
        toDate: $toDate
        fromTime: $fromTime
        toTime: $toTime
        fromProvince: $fromProvince
        toProvince: $toProvince
        fromAirport: $fromAirport
        toAirport: $toAirport
        fromAirline: $fromAirline
        toAirline: $toAirline
        fromFlightNumber: $fromFlightNumber
        toFlightNumber: $toFlightNumber
        insuranceId: $insuranceId
        subscriptionId: $subscriptionId
        rentalItems: $rentalItems
        additionalCoverages: $additionalCoverages
        additionalDrivers: $additionalDrivers
      }
    ) {
      rental {
        rowId
        rentalNumber
        fromDate
        toDate
        fromTime
        toTime
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
        rentalStates(orderBy: ADDED_AT_ASC) {
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
//ADD_FAVORITE_VEHICLE
export const ADD_FAVORITE_VEHICLE = gql`
  mutation ($userId: UUID!, $vehicleId: UUID!) {
    createUserVehicleFavorite(
      input: { userVehicleFavorite: { userId: $userId, vehicleId: $vehicleId } }
    ) {
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
`;
//DELETE_FAVORITE_VEHICLE
export const DELETE_FAVORITE_VEHICLE = gql`
  mutation ($userId: UUID!, $vehicleId: UUID!) {
    deleteUserVehicleFavorite(
      input: { userId: $userId, vehicleId: $vehicleId }
    ) {
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
`;
//COMPLETE PROFILE
export const COMPLETE_USER = gql`
  mutation ($userId: UUID!, $urlPhoto: String!) {
    updateUser(
      input: { rowId: $userId, patch: { licensePhotoUrl: $urlPhoto } }
    ) {
      user {
        rowId
      }
    }
  }
`;
export const APROVE_OR_REJECT_PAYMENT_SUPCRIPTIONS = gql`
  mutation (
    $subscriptionId: String!
    $approval: Boolean!
    $paymentDate: Datetime!
    $userId: String!
  ) {
    approvalOrRejectSubscriptionPayment(
      input: {
        subscriptionId: $subscriptionId
        approval: $approval
        paymentDate: $paymentDate
        userId: $userId
      }
    ) {
      subscriptionPayment {
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
//update vehicles
export const UPDATE_VEHICLES = gql`
  mutation updateAVehicle(
    $vehicleId: String!
    $branchId: String!
    $vehicleTypeIds: [String!]!
    $vehicleBrandId: String!
    $vehicleModelId: String!
    $year: Int!
    $fuelTypeId: String!
    $personQuantity: Int!
    $tractionControlTypeId: String!
    $vehicleSeatingId: String!
    $vehicleColorId: String!
    $currencyId: String!
    $basePrice: BigFloat!
    $depositPercent: BigFloat!
    $isDeluxe: Boolean!
    $active: Boolean!
    $vehicleAmenities: [String!]!
    $vehicleImages: [String!]!
  ) {
    updateAVehicle(
      input: {
        vehicleId: $vehicleId
        branchId: $branchId
        vehicleTypeIds: $vehicleTypeIds
        vehicleBrandId: $vehicleBrandId
        vehicleModelId: $vehicleModelId
        year: $year
        fuelTypeId: $fuelTypeId
        personQuantity: $personQuantity
        tractionControlTypeId: $tractionControlTypeId
        vehicleSeatingId: $vehicleSeatingId
        vehicleColorId: $vehicleColorId
        currencyId: $currencyId
        basePrice: $basePrice
        depositPercent: $depositPercent
        isDeluxe: $isDeluxe
        active: $active
        vehicleAmenities: $vehicleAmenities
        vehicleImages: $vehicleImages
      }
    ) {
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
`;
//
export const READ_NOTIFICAION = gql`
  mutation ($notificationId: UUID!) {
    updateNotification(
      input: { rowId: $notificationId, patch: { read: true } }
    ) {
      notification {
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
//CANCEL_REQUEST
export const CANCEL_REQUEST = gql`
  mutation ($rentalId: String!, $userId: String!) {
    cancelRequest(input: { rentalId: $rentalId, userId: $userId }) {
      rental {
        rowId
        rentalNumber
        branch {
          rowId
          name
          addressLatitude
          addressLongitude
          addressAdditionalDescription
        }
        fromDate
        toDate
        fromTime
        toTime
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
        rentalStates(orderBy: ADDED_AT_ASC) {
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
//CREATE_RENTAL_STATE
export const CREATE_RENTAL_STATE = gql`
  mutation ($rentalId: UUID!, $rentalStateTypeId: UUID!, $userId: UUID!) {
    createRentalState(
      input: {
        rentalState: {
          rentalId: $rentalId
          rentalStateTypeId: $rentalStateTypeId
          userId: $userId
        }
      }
    ) {
      rental {
        rowId
        rentalNumber
        branch {
          rowId
          name
          addressLatitude
          addressLongitude
          addressAdditionalDescription
        }
        fromDate
        toDate
        fromTime
        toTime
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
        rentalStates(orderBy: ADDED_AT_ASC) {
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
//DELETE_RENTAL_STATE
export const DELETE_RENTAL_STATE = gql`
  mutation ($rentalId: UUID!, $rentalStateTypeId: UUID!) {
    deleteRentalState(
      input: { rentalId: $rentalId, rentalStateTypeId: $rentalStateTypeId }
    ) {
      rental {
        rowId
        rentalNumber
        branch {
          rowId
          name
          addressLatitude
          addressLongitude
          addressAdditionalDescription
        }
        fromDate
        toDate
        fromTime
        toTime
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
        rentalStates(orderBy: ADDED_AT_ASC) {
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
//GO_PAYMENT

//APPROVAL_OR_REJECT_PAYMENT
export const APPROVAL_OR_REJECT_PAYMENT = gql`
  mutation ($rentalId: String!, $userId: String!, $approval: Boolean!) {
    approvalOrRejectPayment(
      input: { rentalId: $rentalId, approval: $approval, userId: $userId }
    ) {
      rental {
        rowId
        rentalNumber
        branch {
          rowId
          name
          addressLatitude
          addressLongitude
          addressAdditionalDescription
        }
        fromDate
        toDate
        fromTime
        toTime
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
        rentalStates(orderBy: ADDED_AT_ASC) {
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
export const GO_PAYMENT = gql`
  mutation (
    $rentalId: String!
    $rentalPaymentTypeId: String!
    $userId: String!
    $paymentAmount: BigFloat
    $paymentPhotoUrl: String!
    $paymentReferences: String
  ) {
    doPayment(
      input: {
        rentalId: $rentalId
        rentalPaymentTypeId: $rentalPaymentTypeId
        userId: $userId
        paymentAmount: $paymentAmount
        paymentPhotoUrl: $paymentPhotoUrl
        paymentReferences: $paymentReferences
      }
    ) {
      rental {
        rowId
        rentalNumber
        branch {
          rowId
          name
          addressLatitude
          addressLongitude
          addressAdditionalDescription
        }
        fromDate
        toDate
        fromTime
        toTime
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
        rentalStates(orderBy: ADDED_AT_ASC) {
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
//APPROVAL_OR_REJECT_RQUEST
export const APPROVAL_OR_REJECT_RQUEST = gql`
  mutation ($rentalId: String!, $approval: Boolean, $userId: String!) {
    approvalOrRejectRequest(
      input: { rentalId: $rentalId, approval: $approval, userId: $userId }
    ) {
      rental {
        rowId
        rentalNumber
        branch {
          rowId
          name
          addressLatitude
          addressLongitude
          addressAdditionalDescription
        }
        fromDate
        toDate
        fromTime
        toTime
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
        rentalStates(orderBy: ADDED_AT_ASC) {
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
//post vehicles

export const POST_VEHICLES = gql`
  mutation publishAVehicleQuery(
    $branchId: String!
    $owner: String!
    $vehicleTypeIds: [String!]!
    $vehicleBrandId: String!
    $vehicleModelId: String!
    $year: Int!
    $fuelTypeId: String!
    $personQuantity: Int!
    $tractionControlTypeId: String!
    $vehicleSeatingId: String!
    $vehicleColorId: String!
    $basePrice: BigFloat!
    $depositPercent: BigFloat!
    $vehicleImages: [String!]!
    $vehicleAmenities: [String!]!
    $isDeluxe: Boolean!
  ) {
    publishAVehicle(
      input: {
        branchId: $branchId
        owner: $owner
        vehicleTypeIds: $vehicleTypeIds
        vehicleBrandId: $vehicleBrandId
        vehicleModelId: $vehicleModelId
        year: $year
        fuelTypeId: $fuelTypeId
        personQuantity: $personQuantity
        tractionControlTypeId: $tractionControlTypeId
        vehicleSeatingId: $vehicleSeatingId
        vehicleColorId: $vehicleColorId
        basePrice: $basePrice
        depositPercent: $depositPercent
        vehicleImages: $vehicleImages
        vehicleAmenities: $vehicleAmenities
        isDeluxe: $isDeluxe
      }
    ) {
      vehicle {
        rowId
      }
    }
  }
`;
