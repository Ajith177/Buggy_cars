Bug ID: BUG-001
 Title: Registration form uses “Login” field instead of “Email” as unique identifier
 Description:
 The registration page currently asks users to provide a “Login” field along with first name, last name, password, and confirm password. In standard e-commerce workflows, email is used as the primary login identifier instead of a custom username. This creates redundancy and may confuse users.
Steps to Reproduce:
Navigate to https://buggy.justtestit.org/register

Observe the registration form fields.

Expected Result:
 Registration form should include Email as the unique identifier (with proper validation for email format).
Actual Result:
 Registration form includes a Login field instead of Email.
Severity: Medium
 Priority: Medium
 Category: UI/UX / Usability
 Environment: Windows 10, Chrome 140.0, Edge 140.0
Screenshot: (attach one of the form)
Suggested Fix/Workaround:
Replace “Login” field with Email field.

Apply proper email format validation.

Screenshot_file='BUG_001.png'

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Bug ID: BUG-002
Title: Password field missing placeholder text while Login field includes it

Description:
On the registration page, the Login field includes a placeholder (“Login”) for user guidance. However, the Password and Confirm Password fields do not include any placeholder text.
This creates inconsistency and reduces usability, as users may expect similar visual guidance across all fields.

Steps to Reproduce:

Navigate to https://buggy.justtestit.org

Observe the Login field → placeholder text is shown.

Observe the Password and Confirm Password fields → no placeholder text.

Expected Result:

All input fields should follow a consistent style.

Password and Confirm Password should include meaningful placeholder text (e.g., Enter password, Re-enter password).

Actual Result:

Only the Login field shows placeholder text.

Password fields have no placeholder, which may confuse users.

Severity: Low
Priority: Low
Category: UI/UX / Consistency
Environment:

OS: Windows 10 (10.0.19045.6332)

Browser: Chrome 140.0, Edge 140.0

Screenshot:


Suggested Fix / Workaround:

Add appropriate placeholder text for Password and Confirm Password fields.

Ensure placeholder usage is consistent across all form fields.

Screenshot_file='BUG_002.png'

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Bug ID: BUG-003
Title: Page briefly redirects to Login screen on refresh before returning to previous page

Description:
After logging in with valid credentials, the application allows entry as expected. However, when refreshing the page, the application momentarily redirects to the Login page before switching back to the previously visited page.
This behavior is confusing to the user and indicates improper handling of authentication/session state during page reloads.

Steps to Reproduce:

Navigate to https://buggy.justtestit.org/

Log in with a valid username and password.

Navigate to any internal page (e.g., Profile or Dashboard).

Refresh the browser page.

Expected Result:

The user should remain on the same page without seeing the Login screen.

Session management should validate the user token silently in the background.

Actual Result:

On refresh, the application first loads the Login page.

After a moment, it redirects back to the previous page.

Severity: Medium
Priority: Medium
Category: Functional / Session Handling

Environment:

OS: Windows 10 (10.0.19045.6332)

Browsers: Chrome 140.0, Edge 140.0, Firefox (latest)



Suggested Fix / Workaround:

Ensure proper session persistence during page reloads.

Maintain authentication state in a secure, persistent storage (e.g., cookies with HttpOnly flag or localStorage tokens).

Handle session validation before rendering the login screen to avoid flickering.

Screenshot_file='BUG_003.png'

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Bug Report

Bug ID: BUG-004
Title: "Buggy car rating" title link behaves inconsistently across pages

Description:
The application header displays a common title "Buggy car rating" across all pages.
However, the navigation behavior of this title is inconsistent:

When clicked from the Lamborghini page, nothing happens.

When clicked from the Profile page, it redirects correctly to the Home page.
This inconsistency confuses users and breaks expected navigation flow.

Steps to Reproduce:

Log in with valid username and password.

From the home page, click on the Lamborghini image → navigates to Lamborghini page.

Click on the "Buggy car rating" title in the header.

Result: No navigation occurs.

From the same session, go to Profile page.

Click on the "Buggy car rating" title again.

Result: Redirects to the Home page as expected.

Expected Result:

The "Buggy car rating" title should behave consistently across all pages.

It should always navigate to the Home page when clicked.

Actual Result:

On the Lamborghini page, the title click does nothing.

On the Profile page, the title click correctly redirects to the Home page.

Severity: Medium
Priority: Medium
Category: Functional / Navigation

Environment:

OS: Windows 10 (10.0.19045.6332)

Browsers: Chrome 140.0, Edge 140.0, Firefox (latest)


Suggested Fix / Workaround:

Ensure that the "Buggy car rating" title has a consistent navigation link (e.g., always redirect to Home page).

Apply this fix across all pages for uniformity.

Screenshot_file='BUG_004.png'


----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Bug ID: BUG-005
Title: Logout does not redirect user to login page; stale Profile page is still accessible

Description:
When a logged-in user clicks the Logout button from the Profile module, the application removes the session (API token is refreshed/invalidated). However, the UI remains stuck on the Profile page. If the user clicks Login again, the login API call succeeds and the user is automatically logged back in — but the page still visually remains in the Profile module.

This creates confusion and potential security concerns, since a logged-out user should not still see their profile page.

Steps to Reproduce:

Navigate to https://buggy.justtestit.org/

Log in with valid username and password.

Go to Profile module.

Click Logout.

Observe that:

The session is invalidated (API token reset).

But the UI remains on the Profile module.

Click Login again.

The login API call happens, but the UI still shows Profile page.

Expected Result:

After logout, the user should be redirected to the login page.

Profile or other private modules should no longer be visible without logging in again.

Actual Result:

UI remains on the Profile page even after logout.

Clicking Login again calls login API successfully, but the UI doesn’t reset and still shows the stale Profile module.

Severity: High (Session handling & security issue)
Priority: High (Must fix to avoid unauthorized access)
Category: Authentication / Session Management / UI-UX
Environment: Windows 10, Chrome 140.0, Edge 140.0, Firefox 129.0
Screenshot/Video: (attach recording showing logout → stale profile page)

Suggested Fix/Workaround:

On Logout:

Clear session/token from frontend storage (local/session storage).

Redirect user to the login page.

On Login:

Ensure UI reloads the correct module (home/dashboard), not the stale Profile page.

 This is a UI + API mismatch issue:

API correctly invalidates the token.

UI fails to reset state → shows stale Profile page.

Screenshot_file='BUG_005.png'


----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Bug ID: BUG-006
Title: Gender dropdown allows manual text input instead of restricting to predefined options

Description:
In the Profile module, the Gender field is implemented as a dropdown containing predefined options: Male and Female. However, the field currently allows users to type arbitrary text values (e.g., “QWER”, “HBRF”) instead of being restricted to selecting only from the available options.

This causes data inconsistency and potential issues in downstream processes (e.g., reporting, validation, or integrations) since invalid gender values can be saved or attempted to be submitted.

Steps to Reproduce:

Navigate to https://buggy.justtestit.org/

Screenshot_file='BUG_006.png'











