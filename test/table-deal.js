var request = require('request');
var expect = require('chai').expect;

describe('deal tables', function() {
  var Body = [];

  it('should successfuly list tables', function(done) {
    request.get('http://localhost:3000/admin/project0/table?limit=999', function(err, res, body) {
      expect(err).to.be.null;
      expect(res.statusCode).to.equal(200);
      Body = JSON.parse(body);
      done();
    });
  });

  it('should successfuly show table detail', function(done) {
    if (!Body.length) return done();
    Body.forEach(function(table, index) {
      request.get('http://localhost:3000/admin/project0/table/' + table._id, function(err, res) {
        expect(err).to.be.null;
        expect(res.statusCode).to.equal(200);
        if (index === Body.length - 1) done();
      });
    });
  });

  it('should successfuly edit tables', function(done) {
    if (!Body.length) return done();
    Body.forEach(function(table, index) {
      request.patch('http://localhost:3000/admin/project0/table/' + table._id, {
        json: true,
        body: {
          name: 'table-edit' + index
        }
      }, function(err, res) {
        expect(err).to.be.null;
        expect(res.statusCode).to.equal(204);
        if (index === Body.length - 1) done();
      });
    });
  });

  it('should successfuly remove tables', function(done) {
    if (!Body.length) done();
    Body.forEach(function(table, index) {
      request.del('http://localhost:3000/admin/project0/table/' + table._id, {
        json: true,
        body: {}
      }, function(err, res) {
        expect(err).to.be.null;
        expect(res.statusCode).to.equal(204);
        if (index === Body.length - 1) done();
      });
    });
  });
});
