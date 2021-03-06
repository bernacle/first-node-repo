"use strict";

require("reflect-metadata");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ShowProfileService = _interopRequireDefault(require("./ShowProfileService"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let showProfile;
describe("ShowProfile", () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUsersRepository.default();
    showProfile = new _ShowProfileService.default(fakeUserRepository);
  });
  it("should be able to show the profile", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });
    const profile = await showProfile.execute({
      user_id: user.id
    });
    expect(profile.name).toBe("John Doe");
    expect(profile.email).toBe("johndoe@example.com");
  });
  it("should not be able to show the profile from non-existing user", async () => {
    expect(showProfile.execute({
      user_id: "non-existing-user-id"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});