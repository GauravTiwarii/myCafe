'use strict';

var chai = require('chai'),
	expect  = chai.expect,
	sinon = require('sinon'),
	orderSystemWith = require('../lib/orders');



chai.use(require("chai-as-promised"));


//describe test suite
describe('Customer displays order', function() {
	beforeEach(function() { 
		var orderDAO = {
				byId : sinon.stub()
			},
			orderSystem = orderSystemWith(orderDAO);

		orderDAO.byId.withArgs('some empty order id').returns([]);

		this.result = orderSystem.display('some empty order id');
	});

	//scenario 1
	context('Given that the order is empty', function() {

// 		var result;
		var orderId;
		beforeEach(function (done){
			orderId = 'some empty order id';
			this.orderDAO.byId.withArgs(this.orderId)
							  .callsArgWithAsync(1, null, []);

							  

/*
			this.orderSystem.display(this.orderId, function(err, res){
				result = res;
				done(err);
			})
*/
/*

			return this.orderSystem.display(this.orderId)
					.then(function(res){
						result  = res;
					})
*/

			this.result = this.orderSystem.display(orderId);

			
		})
		it('will show no order items', function() {

/*
			return this.result.then(function() {
				expect(result).to.have.property('items').that.is.empty;

			})
*/
			return expect(this.result).to.eventually.have.property('items').that.is.empty;
			
		});
		it('will show 0 as the total price', function() {
			
			return expect(this.result).to.eventually.have.property('totalPrice').that.is.equal(0);

		});
		it('will only be possible to add a beverage', function() {

			return expect(this.result).to.eventually.have.property('actions')
				.that.is.deep.equal([{
					action : 'append-beverage',
					target : orderId,
					parameters  : {
						beverageRef : null,
						quantity : 0
					}
				}])		
		});
	});

	//scenario 2
	context('Given that the order contains beverages', function() {
		
		it('will show one item per beverage');
		it('will show the sum of the unit prices as total price');	
		it('will be possible to place the order');
		it('will be possible to remove a beverage');
		it('will be possible to change the quantity of a beverage');
	});


	context('Given that the order has pending messages', function() {
		it('will show the pending messages');
		it('there will be no more pending messages');
	})

	
})