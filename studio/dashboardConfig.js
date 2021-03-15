export default {
  widgets: [
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '604f8a14a0dd561d566614d7',
                  title: 'Sanity Studio',
                  name: 'sanity-kitchen-sink-studio-2cs4u8mc',
                  apiId: 'cb1838d1-da82-4a4a-8ea3-1b12dece0897'
                },
                {
                  buildHookId: '604f8a149b38f51f77919a18',
                  title: 'Blog Website',
                  name: 'sanity-kitchen-sink-web-oyx6hc3b',
                  apiId: '704c036b-bb69-4962-bd5b-4040a4e88ca4'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/oleandry/sanity-kitchen-sink',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://sanity-kitchen-sink-web-oyx6hc3b.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
