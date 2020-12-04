import { Mongo } from 'meteor/mongo'
import * as yup from 'yup'
import { Redirect } from 'react-router-dom'

import { RandomGenerator } from '/imports/api/helpers/randomGenerator'
import regex from '/imports/api/helpers/regex'

export const LabsCollection = new Mongo.Collection('labs')

if (Meteor.isServer) {
  Meteor.publish('lab', ({ _id }) => {
    const client = LabsCollection.find({ _id })
    return client
  })


  Meteor.methods({
      'labs.removeAll'(query={}) {
      LabsCollection.remove(query)
    },
    'labs.remove'({ids=[]}) {
      console.log("ids to delete", ids)
      LabsCollection.remove({_id: {$in: ids}})
    },
    'labs.update'({ _id, newData }) {
      const result = LabsCollection.update({ _id }, { $set: newData })
      return result
    },
    'lab.setFavouriteStatus'({_id, favourite}){
      const result = LabsCollection.update({ _id }, { $set: {favourite} })
      return result
    },
    'labs.create'(client) {
      const result = LabsCollection.insert(client)
      return result
    },
    'labs.paginate'({ page, sortOrder, rowsPerPage, query = {} }) {
      let result = {
        data: LabsCollection.find(query, {
          limit: rowsPerPage,
          skip: page * rowsPerPage,
          sort: {
            [sortOrder.name]: sortOrder.direction == 'asc' ? 1 : -1,
          },
        }).fetch(),
        page: page,
        total: LabsCollection.find(query).count(),
      }

      return result
    },
    'labs.generateSeed'({ n = 1000 }) {
      for (let i = 0; i < n; i++) {
        let client = {
          name: RandomGenerator.randomLabName(),
          director: RandomGenerator.randomDirectorName(),
          city: RandomGenerator.randomCity(),
          country: RandomGenerator.randomCountry(),
        }
        LabsCollection.insert(client)
      }
    },
  })
}
