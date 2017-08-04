# node-training
Keeps all code from NodeJs training that I attended

Set up MongoDB

mongod --directoryperdb --dbpath c:\dev\mongodata\db --logpath c:\dev\mongodata\log\mongodb.log --logappend --rest --install

MongoDB - simple commands:

insert a new item:
	> db.users.insert({name: 'Danielle', email: 'dani_costa@gmail.com', username: 'dani', password: '1234'});

Update an item collection:
	> db.users.update({username: 'tarcisio'}, {$set:{name: 'Tarcisio Costa Corte de Paula'}});

