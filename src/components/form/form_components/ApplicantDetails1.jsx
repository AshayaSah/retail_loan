import React from "react";

const ApplicantDetails1 = () => {
    useEffect(() => {
        // User
        if (sameAddress) {
          setValue("current_province", retailLoanData.province);
          setValue("current_district", retailLoanData.district);
          setValue("current_vdc_municipality", retailLoanData.vdc_municipality);
          setValue("current_ward_no", retailLoanData.ward_no);
        } else {
          // Optionally clear current address fields if unchecked
          setValue("current_province", "");
          setValue("current_district", "");
          setValue("current_vdc_municipality", "");
          setValue("current_ward_no", "");
        }
      }, [
        sameAddress,
        retailLoanData.province,
        retailLoanData.district,
        retailLoanData.vdc_municipality,
        retailLoanData.ward_no,
        setValue,
      ]);
        const [sameAddress, setSameAddress] = useState(false);
    const handleFetchData = async () => {
        setIsFetching(true);
        try {
          await handleFetch();
          toast({
            title: "Successfully Fetched",
            duration: 1000,
          });
        } catch (error) {
          console.error("Fetch error:", error);
          toast({
            title: "Fetch Failed",
            description: "There was an error fetching the data.",
            variant: "destructive",
          });
        } finally {
          setIsFetching(false);
        }
      };
    
  return (
    <div>
      <div>
        {/* Gender */}
        {/* Nationality */}
        <div className="form-section-content">
          <Label htmlFor="pan_number">PAN Number</Label>
          <Input
            id="pan_number"
            type="text"
            placeholder="Enter your PAN number"
            {...register("pan_number", {})}
          />
          {errors.pan_number && (
            <p className="text-red-600 text-sm">{errors.pan_number.message}</p>
          )}
        </div>

        <div className="form-section-content">
          <Label htmlFor="pan_registration_date">Pan Issued Date</Label>
          <Input
            id="pan_registration_date"
            type="date"
            placeholder="DD/MM/YYYY"
            {...register("pan_registration_date", {
              required: "Please, enter your pan issued date",
              pattern: {
                message: "Invalid format. Use DD/MM/YYYY",
              },
            })}
          />
          {errors.pan_registration_date && (
            <p className="text-red-600 text-sm">
              {errors.pan_registration_date.message}
            </p>
          )}
        </div>

        <div className="form-section-content">
          <Label htmlFor="pan_registration_district">Pan Issued District</Label>
          <Select
            onValueChange={(value) =>
              handleSelectChange("pan_registration_district", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your district" />
            </SelectTrigger>
            <SelectContent>
              {districtsNepali.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.pan_registration_district && (
            <p className="text-red-600 text-sm">
              {errors.pan_registration_district.message}
            </p>
          )}
        </div>
        <div className="form-section-content">
          <Label htmlFor="nationality">Nationality</Label>
          <Controller
            name="nationality"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="nationality">
                  <SelectValue placeholder="Select Nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nepali">Nepali</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.nationality && (
            <p className="text-red-600 text-sm">{errors.nationality.message}</p>
          )}
        </div>
        <div className="form-section-content">
          <Label htmlFor="gender">Gender</Label>
          <Controller
            name="gender"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.gender && (
            <p className="text-red-600 text-sm">{errors.gender.message}</p>
          )}
        </div>

        {/* Gender */}
        <div className="form-section-content">
          <Label htmlFor="marital_status">Marital Status</Label>
          <Controller
            name="marital_status"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="marital_status">
                  <SelectValue placeholder="Select Marital Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Single">Single</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.marital_status && (
            <p className="text-red-600 text-sm">
              {errors.marital_status.message}
            </p>
          )}
        </div>
        {/* Family Information Section */}
        <h1 className="form-section-title">Family Information</h1>
        <div className="form-section-content-container">
          <div className="form-section-content">
            <Label htmlFor="fathers_name">
              Father's Name <span className="text-red-600">*</span>
            </Label>
            <Input
              id="fathers_name"
              placeholder="Enter father's name"
              {...register("fathers_name", {
                required: "Father's name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Invalid name. Only letters and spaces are allowed.",
                },
              })}
            />
            {errors.fathers_name && (
              <p className="text-red-600 text-sm">
                {errors.fathers_name.message}
              </p>
            )}
          </div>

          <div className="form-section-content">
            <Label htmlFor="grandfathers_name">Grandfather's Name</Label>
            <Input
              id="grandfathers_name"
              placeholder="Enter grandfather's name"
              {...register("grandfathers_name")}
            />
            {errors.grandfathers_name && (
              <p className="text-red-600 text-sm">
                {errors.grandfathers_name.message}
              </p>
            )}
          </div>

          <div className="form-section-content">
            <Label htmlFor="mothers_name">Mother's Name (Optional)</Label>
            <Input
              id="mothers_name"
              placeholder="Enter mother's name"
              {...register("mothers_name", {
                // required: "Mother's name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Invalid name. Only letters and spaces are allowed.",
                },
              })}
            />
            {errors.mothers_name && (
              <p className="text-red-600 text-sm">
                {errors.mothers_name.message}
              </p>
            )}
          </div>

          <div className="form-section-content">
            <Label htmlFor="spouse_name">Spouse's Name</Label>
            <Input
              id="spouse_name"
              placeholder="Enter spouse's name (if applicable)"
              {...register("spouse_name", {
                pattern: {
                  value: /^[A-Za-z\s]*$/,
                  message: "Invalid name. Only letters and spaces are allowed.",
                },
              })}
            />
            {errors.spouse_name && (
              <p className="text-red-600 text-sm">
                {errors.spouse_name.message}
              </p>
            )}
          </div>

          <div className="form-section-content">
            <Label htmlFor="offsprings">Number of Offsprings</Label>
            <Input
              id="offsprings"
              type="number"
              placeholder="Enter number of children"
              {...register("offsprings", {
                min: {
                  value: 0,
                  message: "Number of offsprings cannot be negative",
                },
                // max: {
                //   value: 20,
                //   message: "Please enter a reasonable number",
                // },
              })}
            />
            {errors.offsprings && (
              <p className="text-red-600 text-sm">
                {errors.offsprings.message}
              </p>
            )}
          </div>
          {/* Age */}
          <div className="form-section-content">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              disabled
              placeholder="Age"
              {...register("age")}
            />
            {errors.age && (
              <p className="text-red-600 text-sm">{errors.age.message}</p>
            )}
          </div>

          {/* Email Address Field */}
          <div className="form-section-content ">
            <Label htmlFor="custom_email">
              Email Address <span className="text-red-600">*</span>
            </Label>
            <Input
              id="custom_email"
              type="custom_email"
              placeholder="Enter your email"
              {...register("custom_email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.custom_email && (
              <p className="text-red-600 text-sm">
                {errors.custom_email.message}
              </p>
            )}
          </div>
          {/* Client COde */}
          <div className="form-section-content ">
            <Label htmlFor="customer_client_code">
              Client Code <span className="text-red-600">*</span>
            </Label>
            <Input
              id="customer_client_code"
              type="customer_client_code"
              placeholder="Enter your Client Code"
              {...register("customer_client_code", {
                required: "Client Code is required",
                // pattern: {
                //   value:
                //     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                //   message: "Enter a valid email address",
                // },
              })}
            />
            {errors.customer_client_code && (
              <p className="text-red-600 text-sm">
                {errors.customer_client_code.message}
              </p>
            )}
          </div>
          <div className="form-section-content">
            <Label htmlFor="citizenship_issued_district">
              Citizenship Issued District{" "}
              <span className="text-red-600">*</span>
            </Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("citizenship_issued_district", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your district" />
              </SelectTrigger>
              <SelectContent>
                {districtsNepali.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.citizenship_issued_district && (
              <p className="text-red-600 text-sm">
                {errors.citizenship_issued_district.message}
              </p>
            )}
          </div>
          {loading ? <TwoColumnFormLoadingScreen /> : <> </>}
          {/* Checkbox  */}
          <div className="form-section-content-container-single">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="same_address"
                checked={sameAddress}
                onCheckedChange={(checked) => setSameAddress(checked)}
              />
              <Label htmlFor="same_address">
                Current Address Same as Permanent Address?
              </Label>
            </div>
          </div>
          {/* Current Address */}
          <h1 className="form-section-title">Current Address</h1>
          <div className="form-section-content-container pb-0">
            {/* {sameAddress ? (
                  <>
                    <div className="form-section-content">
                      <Label htmlFor="current_province">Province</Label>
                      <Input
                        id="current_province"
                        disabled={sameAddress}
                        placeholder="Enter province"
                        {...register("current_province", {
                          required: "Province is required",
                        })}
                      />
                      {errors.current_province && (
                        <p className="text-red-600 text-sm">
                          {errors.current_province.message}
                        </p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="current_district">District</Label>
                      <Input
                        id="current_district"
                        placeholder="Enter district"
                        disabled={sameAddress}
                        {...register("current_district", {
                          required: "District is required",
                        })}
                      />
                      {errors.current_district && (
                        <p className="text-red-600 text-sm">
                          {errors.current_district.message}
                        </p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="current_vdc_municipality">
                        VDC/Municipality
                      </Label>
                      <Input
                        id="current_vdc_municipality"
                        disabled={sameAddress}
                        placeholder="Enter VDC/Municipality"
                        {...register("current_vdc_municipality", {
                          required: "This field is required",
                        })}
                      />
                      {errors.current_vdc_municipality && (
                        <p className="text-red-600 text-sm">
                          {errors.current_vdc_municipality.message}
                        </p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="current_ward_no">Ward No</Label>
                      <Input
                        id="current_ward_no"
                        type="number"
                        disabled={sameAddress}
                        placeholder="Enter ward number"
                        {...register("current_ward_no", {
                          required: "Ward number is required",
                        })}
                      />
                      {errors.current_ward_no && (
                        <p className="text-red-600 text-sm">
                          {errors.current_ward_no.message}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <> */}
            <div className="form-section-content">
              <Label htmlFor="current_province">Province</Label>
              <Controller
                name="current_province"
                control={control}
                rules={{ required: "Province is required" }}
                render={({ field }) => (
                  <Select
                    onValueChange={handleCurrentProvinceChange}
                    disabled={sameAddress}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your province" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinceData.map((province) => (
                        <SelectItem
                          key={province.province}
                          value={province.province}
                        >
                          {province.province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.current_province && (
                <p className="text-red-600 text-sm">
                  {errors.current_province.message}
                </p>
              )}
            </div>

            <div className="form-section-content">
              <Label htmlFor="current_district">District</Label>
              <Controller
                name="current_district"
                control={control}
                rules={{ required: "District is required" }}
                render={({ field }) => (
                  <Select
                    onValueChange={handleCurrentDistrictChange}
                    value={field.value}
                    disabled={!watch("current_province") || sameAddress} // Disable if no province is selected
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a district" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentDistricts.map((district) => (
                        <SelectItem key={district.name} value={district.name}>
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.current_district && (
                <p className="text-red-600 text-sm">
                  {errors.current_district.message}
                </p>
              )}
            </div>

            <div className="form-section-content">
              <Label htmlFor="current_vdc_municipality">VDC/Municipality</Label>
              <Controller
                name="current_vdc_municipality"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select
                    onValueChange={handleCurrentMunicipalityChange}
                    value={field.value}
                    disabled={!watch("current_district") || sameAddress}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select VDC/Municipality" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentMunicipalities.map((municipality) => (
                        <SelectItem key={municipality} value={municipality}>
                          {municipality}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.current_vdc_municipality && (
                <p className="text-red-600 text-sm">
                  {errors.current_vdc_municipality.message}
                </p>
              )}
            </div>

            <div className="form-section-content">
              <Label htmlFor="current_ward_no">Ward No</Label>
              <Input
                id="current_ward_no"
                type="number"
                placeholder="Enter ward number"
                {...register("current_ward_no", {
                  required: "Ward number is required",
                })}
              />
              {errors.current_ward_no && (
                <p className="text-red-600 text-sm">
                  {errors.current_ward_no.message}
                </p>
              )}
            </div>
          </div>
          <div className="form-section-content">
            <Label htmlFor="no_of_proposal">No. of Proposal</Label>
            <Input
              id="no_of_proposal"
              placeholder="Select Proposal"
              disabled
              defaultValue="Multiple"
              {...register("no_of_proposal", {
                required: "No. of Proposal",
              })}
            />
            {errors.no_of_proposal && (
              <p className="text-red-600 text-sm">
                {errors.no_of_proposal.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetails1;
