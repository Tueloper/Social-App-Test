// /* eslint-disable no-constant-condition */
// import { describe, it } from 'mocha';
// import chai, { expect } from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../../src';
// import model from '../../src/models';
// import { hashPassword } from '../../src/utils/passwordHash';
// import { createToken } from '../../src/utils/processToken';

// const { User } = model;

// chai.use(chaiHttp);
// let usrtoken = '';

// describe('User Auth', () => {
// 	const testUser = {
// 		uuid: 'b38fcf44-b77f-4149-8d66-454d7a5eacda',
// 		name: 'Susan Abioye',
// 		username: 'susan',
// 		email: 'susan.abioye@kodehauz.com',
// 		password: hashPassword('Password111'),
// 		phone: '07012221111',
// 		role: 'user',
// 		verified: true,
// 		status: 'active',
// 		createdAt: new Date(),
// 		updatedAt: new Date()
// 	};

// 	before(async () => {
// 		await User.create(testUser);
// 	});
// 	after(async () => User.destroy({ where: {}, force: true }));

// 	const userData = {
// 		username: 'beckyjerome',
// 		name: 'Becky Jerome',
// 		phone: '07037779113',
// 		email: 'rebecca.jerome@kodehauz.com',
// 		password: 'Password111',
// 		role: 'user'
// 	};
// 	const token = createToken(userData);

// 	describe('User SignUp API', () => {
// 		it('Should return success for signup', (done) => {
// 			chai.request(app).post('/api/v1/auth/signUp').send(userData).end((err, res) => {
// 				expect(res.status).eql(201);
// 				expect(res.body).to.be.an('object');
// 				expect(res.body.status).to.eql('success');
// 				done();
// 			});
// 		});

// 		it('Should display an error message of name field is required', (done) => {
// 			chai
// 				.request(app)
// 				.post('/api/v1/auth/signup')
// 				.send({
// 					name: '',
// 					password: '',
// 					username: ''
// 				})
// 				.end((err, res) => {
// 					expect(res.status).to.be.eql(422);
// 					expect(res.body).to.be.an('object');
// 					expect(res.body.status).to.eql('error');
// 					expect(res.body.error).to.be.have.any.keys('name', 'email', 'password');
// 					done();
// 				});
// 		});

// 		it('Should display an error message of name should contain only alphabets', (done) => {
// 			chai
// 				.request(app)
// 				.post('/api/v1/auth/signup')
// 				.send({
// 					name: 'becky33',
// 					phone: '07037779113',
// 					email: 'rebecca.jerome@kodehauz.com',
// 					password: 'Password111',
// 					role: 'user'
// 				})
// 				.end((err, res) => {
// 					expect(res.status).to.be.eql(422);
// 					expect(res.body).to.be.an('object');
// 					expect(res.body.status).to.eql('error');
// 					expect(res.body.error).to.have.property('name');
// 					done();
// 				});
// 		});

// 		it('Should display an error message of email already registered', (done) => {
// 			chai.request(app).post('/api/v1/auth/signup').send(userData).end((err, res) => {
// 				expect(res.status).to.be.eql(409);
// 				expect(res.body).to.be.an('object');
// 				expect(res.body.status).to.eql('error');
// 				done();
// 			});
// 		});

// 		it('Should display an error message of password should be at least eight characters', (done) => {
// 			chai
// 				.request(app)
// 				.post('/api/v1/auth/signup')
// 				.send({
// 					name: 'Becky Jerome',
// 					phone: '07037779113',
// 					email: 'rebecca.swt@kodehauz.com',
// 					password: 'beck',
// 					role: 'user'
// 				})
// 				.end((err, res) => {
// 					expect(res.status).to.be.eql(422);
// 					expect(res.body).to.be.an('object');
// 					expect(res.body.status).to.eql('error');
// 					expect(res.body.error).to.have.property('password');
// 					done();
// 				});
// 		});

// 		it('Should display an error message of password should contain at least one Uppercase letter, one lowercase letter, and at least one digit', (
// 			done
// 		) => {
// 			chai
// 				.request(app)
// 				.post('/api/v1/auth/signup')
// 				.send({
// 					name: 'Becky Jerome',
// 					phone: '07037779113',
// 					email: 'rebecca.jerome@me.com',
// 					password: 'Password',
// 					role: 'user'
// 				})
// 				.end((err, res) => {
// 					expect(res.status).to.be.eql(422);
// 					expect(res.body).to.be.an('object');
// 					expect(res.body.status).to.eql('error');
// 					expect(res.body.error).to.have.property('password');
// 					done();
// 				});
// 		});

// 		it('Should display an error message of email should be of the form; example@ymail.com', (done) => {
// 			userData.email = 'becky@mail';
// 			chai
// 				.request(app)
// 				.post('/api/v1/auth/signup')
// 				.send({
// 					name: 'Becky Jerome',
// 					phone: '07037779113',
// 					email: 'rebecca.jerome@mail',
// 					password: 'Password111',
// 					role: 'user'
// 				})
// 				.end((err, res) => {
// 					expect(res.status).to.be.eql(422);
// 					expect(res.body).to.be.an('object');
// 					expect(res.body.status).to.eql('error');
// 					expect(res.body.error).to.have.property('email');
// 					done();
// 				});
// 		});
// 	});

// 	describe('User Login API', () => {
// 		it('Should sign in user with correct email and password', (done) => {
// 			chai
// 				.request(app)
// 				.post('/api/v1/auth/signin')
// 				.send({
// 					email: 'susan.abioye@kodehauz.com',
// 					password: 'Password111'
// 				})
// 				.end((err, res) => {
// 					expect(res.status).to.equal(200);
// 					expect(res.body.data).to.have.property('token');
// 					done();
// 				});
// 		});

// 		it('Should sign in user with correct username and password', (done) => {
// 			chai
// 				.request(app)
// 				.post('/api/v1/auth/signin')
// 				.send({
// 					username: 'susan',
// 					password: 'Password111'
// 				})
// 				.end((err, res) => {
// 					expect(res.status).to.equal(200);
// 					expect(res.body.data).to.have.property('token');
// 					done();
// 				});
// 		});

// 		it('Should not sign in unregistered user', (done) => {
// 			chai
// 				.request(app)
// 				.post('/api/v1/auth/signin')
// 				.send({
// 					email: 'rebecca.jerome@alp.com',
// 					password: 'Password1113'
// 				})
// 				.end((err, res) => {
// 					expect(res).to.have.status(404);
// 					expect(res.body.status).to.eql('error');
// 					done();
// 				});
// 		});

// 		it('Should not sign in an unverified user account', (done) => {
// 			chai
// 				.request(app)
// 				.post('/api/v1/auth/signin')
// 				.send({
// 					email: 'rebecca.jerome@kodehauz.com',
// 					password: 'Password111'
// 				})
// 				.end((err, res) => {
// 					expect(res.status).to.be.eql(401);
// 					expect(res.body.status).to.eql('error');
// 					expect(res.body).to.have.property('error');
// 					done();
// 				});
// 		});

// 		it('Should not sign in a user with incorrect password', (done) => {
// 			chai
// 				.request(app)
// 				.post('/api/v1/auth/signin')
// 				.send({
// 					email: 'susan.abioye@kodehauz.com',
// 					password: 'Password'
// 				})
// 				.end((err, res) => {
// 					expect(res.status).to.be.eql(400);
// 					expect(res.body.status).to.eql('error');
// 					done();
// 				});
// 		});
// 	});

// 	describe('User Verify API', () => {
// 		const userdetails = {
// 			token: '0c01f1f5-3eff-47f9-abb2-a1de85444fd6',
// 			email: 'olifedayo94@gmail.com',
// 			id: '7863c9fb-10e2-4a83-ac47-b991ea7aa5b2'
// 		};
// 		it('Should verify user that has not been verified and has correct token', (done) => {
// 			chai
// 				.request(app)
// 				.get('/api/v1/auth/verification')
// 				.query({
// 					token: userdetails.token,
// 					email: userdetails.email,
// 					id: userdetails.id
// 				})
// 				.end((err, res) => {
// 					if (res.status === 500 || 409 || 400) {
// 						expect(res.body.status).to.be.eql('error');
// 						expect(res.body.error).to.be.oneOf([
// 							'User already verified',
// 							'No user with the token supplied or your token or expired.',
// 							'An error has occurred, please try again',
// 							'Email link has expired \nPlease register or click this button to get a new verification token',
// 							'User not availablle'
// 						]);
// 					} else {
// 						expect(res.status).to.be.eql(200);
// 						expect(res.body.status).to.eql('<h2>You account have been verified successfully</h2>');
// 					}
// 					done();
// 				});
// 		});
// 	});
// 	describe('Send new email', () => {
// 		const userdetails = {
// 			email: 'rebecca.jerome@kodehauz.com'
// 		};
// 		it('Should send new token to user email', (done) => {
// 			chai.request(app).post('/api/v1/auth/refresh-email-token').send(userdetails).end((err, res) => {
// 				if (res.status === 500) {
// 					expect(res.body.status).to.be.eql('error');
// 					expect(res.body.error).to.be.eql('Email not valid, please check your input');
// 				} else {
// 					expect(res.status).to.be.eql(200);
// 					expect(res.body.status).to.eql('success');
// 					expect(res.body.data).to.be.eql('Link sent, Please verify your account');
// 				}
// 				done();
// 			});
// 		});
// 	});
// 	describe('Should reset password', () => {
// 		const userdetails = {
// 			email: 'susan.abioye@kodehauz.com',
// 			newPassword: 'Sussy45678'
// 		};
// 		it("Should successfully change user's password", (done) => {
// 			chai.request(app).post('/api/v1/auth/reset-password').send(userdetails).end((err, res) => {
// 				if (res.status === 500) {
// 					expect(res.body.status).to.be.eql('error');
// 					expect(res.body.error).to.be.eql('User not found');
// 				} else {
// 					expect(res.status).to.be.eql(200);
// 					expect(res.body.status).to.eql('success');
// 					expect(res.body.data).to.be.eql('Password reset successful');
// 				}
// 				done();
// 			});
// 		});
// 	});
// 	describe('User Logout', () => {
// 		before((done) => {
// 			const user = {
// 				username: 'susan',
// 				password: 'Sussy45678'
// 			};
// 			chai.request(app).post('/api/v1/auth/signin').send(user).end((err, res) => {
// 				if (err) throw err;
// 				usrtoken = res.body.data.token;
// 				done();
// 			});
// 		});
// 		it('Should log user out', (done) => {
// 			chai.request(app).get('/api/v1/auth/logout').set('Authorization', usrtoken).end((err, res) => {
// 				if (res.status === 500) {
// 					expect(res.body.status).to.be.eql('error');
// 					expect(res.body.error).to.be.eql('Logout not successful please try again later');
// 				} else {
// 					expect(res.status).to.be.eql(200);
// 					expect(res.body.data).to.eql('You have logged out, we wish to see you on our platform soon');
// 				}
// 				done();
// 			});
// 		});
// 		describe('Protected Route', () => {
// 			const testUserData = {
// 				username: 'beckyjerome',
// 				name: 'Becky Jerome',
// 				phone: '07037779113',
// 				email: 'rebecca.akpan@kodehauz.com',
// 				password: 'Password111',
// 				role: 'user'
// 			};
// 			const token2 = createToken(testUserData);

// 			it('Should return error if unauthenticated user access protected route', (done) => {
// 				chai.request(app).get('/api/v1/auth/me').end((err, res) => {
// 					expect(res.status).to.be.eql(401);
// 					expect(res.body.status).to.eql('error');
// 					expect(res.body.error).to.eql('Authentication required');
// 					done();
// 				});
// 			});

// 			it('Should not allow unregistered user with valid or invalid token access protected route', (done) => {
// 				chai.request(app).get('/api/v1/auth/me').set('authorization', `Bearer ${token2}`).end((err, res) => {
// 					expect(res.status).to.be.eql(401);
// 					expect(res.body.status).to.eql('error');
// 					expect(res.body.error).to.eql('User does not exist');
// 					done();
// 				});
// 			});

// 			it('Should allow authenticated user with valid token to access protected route', (done) => {
// 				chai.request(app).get('/api/v1/auth/me').set('authorization', `Bearer ${token}`).end((err, res) => {
// 					expect(res.status).to.be.eql(200);
// 					expect(res.body.status).to.eql('success');
// 					// eslint-disable-next-line no-unused-expressions
// 					expect(res.body.data.uuid).to.be.a('string').and.not.empty;
// 					expect(res.body.data).to.have.property('email');
// 					done();
// 				});
// 			});
// 		});
// 		describe('Mobile oauth route', () => {
// 			const testUserData = {
// 				username: 'beckyjerome',
// 				name: 'Becky Jerome'
// 			};
// 			const token = createToken(testUserData);

// 			it('Should return error if the access token is wrong for facebook', (done) => {
// 				chai
// 					.request(app)
// 					.post('/api/v1/auth/mobile-Oauth')
// 					.query({
// 						idtoken: token,
// 						provider: 'facebook'
// 					})
// 					.end((err, res) => {
// 						expect(res.status).to.be.eql(404);
// 						expect(res.body.status).to.eql('error');
// 						expect(res.body.error).to.eql("User's Facebook ID not found");
// 						done();
// 					});
// 			});

// 			it('Should return error if the access token is wrong for google', (done) => {
// 				chai
// 					.request(app)
// 					.post('/api/v1/auth/mobile-Oauth')
// 					.query({
// 						idtoken: token,
// 						provider: 'google'
// 					})
// 					.end((err, res) => {
// 						expect(res.status).to.be.eql(404);
// 						expect(res.body.status).to.eql('error');
// 						expect(res.body.error).to.eql("User's Google ID not found");
// 						done();
// 					});
// 			});
// 		});
// 	});
// });
