export default {
  type: 'document',
  name: 'liste',
  fields: [
    {
      type: 'string',
      name: 'title'
    },
    {
      type: 'array',
      name: 'items',
      of: [{ type: 'organisasjon' }]
    }
  ]
}
