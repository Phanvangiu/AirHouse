<?php

use App\Models\Property;

use App\Models\BlogOfCate;
use App\Models\PropertyType;
use Illuminate\Http\Request;
use App\Models\PropertyImage;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\AmenityController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\ProvinceController;

use App\Http\Controllers\RoomTypeController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\BlogCategoryController;
use App\Http\Controllers\PropertyTypeController;
use App\Http\Controllers\PropertyExceptionDateController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//protected route
Route::group(['middleware' => ['auth:sanctum']], function () {

  //user route
  Route::get('/user', function (Request $request) {
    $user = $request->user();
    if ($user->image) {
      $user->image = asset("storage/images/users/" . $user->image);
    }
    $token = $request->bearerToken();
    return response(compact('user', 'token'));
  });
  Route::get('/user/{id}', [UserController::class, 'readById']);
  Route::post('/updateUser', [UserController::class, 'updateUser']);
  Route::post('/uploadImageUser', [UserController::class, 'uploadImage']);
  Route::post('/admin/signup', [UserController::class, 'registerAdmin']);
  Route::post('/logout', [UserController::class, 'logout']);
  Route::get('user/profile/your-dashboard', [UserController::class, 'readForHostDashboard']);


  // amenities route
  Route::post('/createAmenity', [AmenityController::class, 'create']);
  Route::post('/updateAmenity', [AmenityController::class, 'update']);
  Route::post('deleteAmenity', [AmenityController::class, 'delete']);
  Route::get('filterByIdAmenity', [AmenityController::class, 'filterById']);
  Route::get('/readAmenity/{page}', [AmenityController::class, 'readCurrentPage']);

  // property type route
  Route::post('/createPropertyType', [PropertyTypeController::class, 'create']);
  Route::post('/updatePropertyType', [PropertyTypeController::class, 'update']);
  Route::post('deletePropertyType', [PropertyTypeController::class, 'delete']);
  Route::post('filterByNamePropertyType', [PropertyTypeController::class, 'filterByName']);
  Route::get('/readPropertyType/{page}', [PropertyTypeController::class, 'readCurrentPage']);
  Route::get('filterByIdPropertyType', [PropertyTypeController::class, 'filterById']);

  // category route
  Route::post('createCategory', [CategoryController::class, 'create']);
  Route::post('updateCategory', [CategoryController::class, 'update']);
  Route::post('deleteCategory', [CategoryController::class, 'delete']);
  Route::post('filterByName', [CategoryController::class, 'filterByName']);
  Route::get('/readCategory/{page}', [CategoryController::class, 'readCurrentPage']);
  Route::get('/filterByIdCategory', [CategoryController::class, 'filterById']);

  //room type route
  Route::post('createRoomType', [RoomTypeController::class, 'create']);
  Route::post('updateRoomType', [RoomTypeController::class, 'update']);
  Route::post('deleteRoomType', [RoomTypeController::class, 'deleteRoomType']);
  Route::get('/readRoomType/{page}', [RoomTypeController::class, 'readCurrentPage']);
  Route::get('/filterByIdRoomType', [RoomTypeController::class, 'filterById']);

  //property type route  
  Route::post('/createPropertyType', [PropertyTypeController::class, 'create']);
  Route::post('/updatePropertyType', [PropertyTypeController::class, 'update']);
  Route::post('/deletePropertyType', [PropertyTypeController::class, 'delete']);
  Route::post('/filterByNamePropertyType', [PropertyTypeController::class, 'filterByName']);
  Route::get('/readPropertyType/{page}', [PropertyTypeController::class, 'readCurrentPage']);
  Route::get('/filterByIdPropertyType', [PropertyTypeController::class, 'filterById']);

  //chat 
  Route::post('sendMessage', [ChatController::class, 'sendMessage']);
  Route::post('getMessage', [ChatController::class, 'getMessage']);
  Route::post('sendMessage', [ChatController::class, 'sendMessage']);
  Route::get('getMessage/', [ChatController::class, 'getMessage']);
  Route::get('getAllUser', [ChatController::class, 'getAllUser']);


  //property route
  Route::post('/create-property', [PropertyController::class, 'create']);
  Route::post('/read-properties', [PropertyController::class, 'read']);
  Route::post('/update-property', [PropertyController::class, 'updateProperty']);
  Route::get('/delete-property/{id}', [PropertyController::class, 'delete']);
  Route::get('/read-properties-status', [PropertyController::class, 'readCurrentPageStatus']);
  Route::get('/read-property/{id}', [PropertyController::class, 'readById']);
  Route::post('property/accept', [PropertyController::class, 'acceptProperty']);
  Route::post('property/deny', [PropertyController::class, 'denyProperty']);
  Route::get('read-property-to-update', [PropertyController::class, 'readPropertyToUpdate']);
  Route::get('read-property-to-view-booking', [PropertyController::class, 'readProperty']);


  //booking route
  Route::post('user-booking', [BookingController::class, 'createBooking']);
  Route::get('getBookingByUser', [BookingController::class, 'getBookingByUser']);
  Route::get('property-list', [PropertyController::class, 'listingProperty']);
  Route::get('readBooking', [BookingController::class, 'readBooking']);
  Route::get('view-property-booking', [BookingController::class, 'getAllBookingOfProperty']);
  Route::post('deny-booking', [BookingController::class, 'denyBooking']);
  Route::post('accept-booking', [BookingController::class, 'acceptBooking']);
  Route::get('get-all-bookings-of-host', [BookingController::class, 'getHostBookingOfHost']);

  // exception date route
  Route::post('add-exception-date', [PropertyExceptionDateController::class, 'create']);

  //transaction route
  Route::post('/create-payment-intent', [TransactionController::class, 'createPaymentIntent']);
  Route::post('/successBooking', [TransactionController::class, 'success']);
  Route::get('/readSuccessBooking', [TransactionController::class, 'readSuccess']);


  //blog route
  Route::post('createBlog', [BlogController::class, 'create']);
  Route::post('updateBlog', [BlogController::class, 'update']);
  Route::get('deleteBlog/{id}', [BlogController::class, 'delete']);
  Route::get('readCurrentPage', [BlogController::class, 'readCurrentPage']);
  Route::post('/uploadImage', [BlogController::class, 'uploadImage']);

  // blog cate route
  Route::post('createBlogCategory', [BlogCategoryController::class, 'create']);
  Route::post('updateBlogCategory', [BlogCategoryController::class, 'update']);
  Route::get('deleteBlogCategory/{id}', [BlogCategoryController::class, 'delete']);
  Route::get('readCateCurrentPage', [BlogCategoryController::class, 'readCurrentPage']);


  //rating
  Route::post('/createStart', [RatingController::class, 'createStart']);




  Route::get('/get-transaction-count-report', [TransactionController::class, 'getTotalTransactionCount']);
  Route::get('/get-fee-transaction', [TransactionController::class, 'getTotalFeeTransaction']);
  Route::get('/get-to-day-transaction', [TransactionController::class, 'getTodayTransaction']);
});

Route::post('login-admin', [UserController::class, 'loginAdmin']);

Route::get('/verify/{email}', [UserController::class, 'verify'])->name('verify-email');

//
Route::get('/get-all-rating', [RatingController::class, 'readStartAll']);
Route::get('/readAverageStart', [RatingController::class, 'readAverageStart']);


//public route

// public blog category route
Route::get('readBlogCategory', [BlogCategoryController::class, 'read']);
Route::get('filterByIdBlogCategory', [BlogCategoryController::class, 'filterById']);

//public blog route
Route::get('search/{key}', [BlogController::class, 'search']);
Route::get('filterByIdBlog', [BlogController::class, 'filterById']);
Route::get('readBlog', [BlogController::class, 'read']);


Route::get('check-email-unique', [UserController::class, 'checkEmailUnique']);
Route::get('showUserPropertyById', [PropertyController::class, 'showUserPropertyById']);
Route::get('show-property-index', [PropertyController::class, 'showInIndex']);
Route::get('readCategory', [CategoryController::class, 'read']);
Route::get('/readPropertyType', [PropertyTypeController::class, 'read']);
Route::get('/readPropertyType', [PropertyTypeController::class, 'read']);
Route::get('/readAmenity', [AmenityController::class, 'read']);
Route::get('retrieveRoomType', [RoomTypeController::class, 'getRoom']);
Route::get("/getProvinces", [ProvinceController::class, 'get']);
Route::get("/getDistrictAll", [DistrictController::class, 'get']);
Route::get("/getDistrict/province/{provinceID}", [DistrictController::class, 'getBasedOnProvinces']);
Route::post('/signup', [UserController::class, 'signup']);
Route::post('/login', [UserController::class, 'login']);


Route::post('google-signup', [UserController::class, 'signUpGoogle']);
Route::get('filter-preview', [PropertyController::class, 'showInIndexFilterPreview']);

Route::get('/readStart', [RatingController::class, 'readStart']);
Route::get('/profile/dashboard/{id}', [UserController::class, 'readById']);
//