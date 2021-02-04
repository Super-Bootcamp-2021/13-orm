const { EntitySchema } = require('typeorm');

class Worker {
  constructor(id, name, email, nohp, address, photo, bio) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.nohp = nohp;
    this.address = address;
    this.photo = photo;
    this.bio = bio;
  }
}

const WorkerSchema = new EntitySchema({
  name: 'Worker',
  target: Worker,
  tableName: 'workers',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    name: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    email: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    nohp: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    address: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    photo: {
      type: 'varchar',
      length: 255,
      nullable: true,
    },
    bio: {
      type: 'varchar',
      length: 255,
      nullable: true,
    },
  },
});

module.exports = {
  Worker,
  WorkerSchema,
};
