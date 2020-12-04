# labinsider

## Install & Run
```
curl https://install.meteor.com/ | sh
git clone https://github.com/ad31m0/labinsider.git
cd labinsider
meteor npm install
meteor
```

## Live version

- Hosted on galaxy.meteor.com with the free container
- Uses Atlas free 500MB instance
- Have 1 million records generated

```
https://labinsider.duot.io
```

## Notes

- Uses meteor.com for the client, server
- Mongodb instance also included no need to install, customise mongo
- Uses React, react-router-dom, Material-UI, mui-datatables
- Uses Meteor methods for retrieving data, much faster than normal REST
- REST api can be exposed by a onliner installing simple:rest api, all methods are exposed as with already configured access config
- App doesn't make use of Meteor DDP protocol subscribing for large datasets should be avoided
