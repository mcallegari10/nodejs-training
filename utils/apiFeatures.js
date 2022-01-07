class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };

    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this; // This is to chain the methods
  }

  sort() {
    const { sort } = this.queryString;
    this.query.sort(sort ? sort.split(',').join(' ') : '-createdAt');
    return this;
  }

  limitFields() {
    const { fields } = this.queryString;
    this.query.select(fields ? fields.split(',').join(' ') : '-__v');
    return this;
  }

  paginate() {
    const { page, limit } = this.queryString;

    const pageReq = page * 1 || 1;
    const limitReq = limit * 1 || 100;
    const skip = (pageReq - 1) * limitReq;
    this.query.skip(skip).limit(limitReq);

    return this;
  }
}

module.exports = APIFeatures;
