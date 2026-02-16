# Custom Domain Setup for Maple Star Taxes

## Domains Purchased
- **Primary Domain**: maplestartaxes.com
- **Secondary Domain**: maplestartaxes.ca

## DNS Configuration

### For maplestartaxes.com (Primary Domain)

Add the following DNS records at your domain registrar:

#### A Records (for apex domain)
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

#### CNAME Record (for www subdomain)
```
Type: CNAME
Name: www
Value: praveendubbaka.github.io
TTL: 3600
```

### For maplestartaxes.ca (Secondary Domain - Redirect)

#### Option 1: DNS Redirect (Recommended)
Set up a redirect from maplestartaxes.ca to maplestartaxes.com
- Most domain registrars have a "Domain Forwarding" or "URL Redirect" feature
- Configure: maplestartaxes.ca → https://maplestartaxes.com
- Enable "Forward with masking" if you want the .ca domain to stay in the address bar

#### Option 2: Same A Records
If you want both domains to work independently, add the same A records as above for maplestartaxes.ca

## GitHub Pages Configuration

1. Go to your GitHub repository: https://github.com/PraveenDubbaka/maple-star-taxes
2. Navigate to: **Settings** → **Pages**
3. Under "Custom domain", enter: **maplestartaxes.com**
4. Check "Enforce HTTPS" (after DNS propagation completes)

## Verification Steps

1. **Deploy the CNAME file** (already done ✅)
   ```bash
   npm run deploy
   ```

2. **Wait for DNS Propagation** (24-48 hours, but often faster)
   - Check status: https://www.whatsmydns.net/#A/maplestartaxes.com

3. **Test Your Domains**
   - http://maplestartaxes.com
   - http://www.maplestartaxes.com
   - http://maplestartaxes.ca
   - https://maplestartaxes.com (after HTTPS is enabled)

## Troubleshooting

### DNS Not Resolving
- Wait 24-48 hours for full propagation
- Clear your browser cache
- Try accessing from a different network/device

### "Domain's DNS record could not be retrieved" Error
- Double-check A records are exactly as specified above
- Ensure there are no conflicting DNS records
- Wait for DNS propagation

### HTTPS Certificate Issues
- HTTPS can take up to 24 hours after DNS is configured
- Don't enable "Enforce HTTPS" until the domain resolves properly

## Current Status

✅ CNAME file created with primary domain
✅ Build script updated to include CNAME
⏳ Awaiting DNS configuration at domain registrar
⏳ Awaiting DNS propagation

## Next Steps

1. Configure DNS records at your domain registrar
2. Set custom domain in GitHub Pages settings
3. Deploy the changes
4. Wait for DNS propagation
5. Enable HTTPS in GitHub Pages settings

---

**Note**: Keep this file for reference. DNS configuration is done at your domain registrar's control panel (e.g., GoDaddy, Namecheap, Google Domains, etc.)
